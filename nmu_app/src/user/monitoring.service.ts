import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { MonitoringDto, UserMonitoringPaginated } from './dto/user-list';
import { UserMonitoringArgs } from './dto/user-list.args';
import { User, UserDocument } from './entities/user.entity';

interface CountDoc {
  cnt: number;
}

interface MongoFilter {
  [key: string]: unknown;
  $and?: MongoFilter[];
  $or?: MongoFilter[];
}

@Injectable()
export class UserMonitoringService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getMonitoring(args: UserMonitoringArgs): Promise<UserMonitoringPaginated> {
    const page = Number(args.page ?? 1);
    const pageSize = Number(args.pageSize ?? 20);
    const skip = (page - 1) * pageSize;

    const matchStage: Record<string, unknown> = {
      userRole: { $nin: ['admin', 'developer'] },
    };
    if (args.search?.trim()) {
      const regex = new RegExp(args.search.trim(), 'i');
      (matchStage as { $or?: Array<Record<string, unknown>> }).$or = [{ phoneNumber: regex }, { userName: regex }];
    }

    const pipeline: PipelineStage[] = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'usertaskprogresses',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$user', '$$userId'] }, { $eq: ['$completed', true] }] } } },
            { $project: { task: 1, completedAt: 1 } },
            { $sort: { completedAt: -1 } },
            { $limit: 1 },
            { $lookup: { from: 'tasks', localField: 'task', foreignField: '_id', as: 'task' } },
            { $unwind: { path: '$task', preserveNullAndEmptyArrays: true } },
            { $lookup: { from: 'lessons', localField: 'task.lessonCode', foreignField: 'lessonCode', as: 'lesson' } },
            { $unwind: { path: '$lesson', preserveNullAndEmptyArrays: true } },
            { $lookup: { from: 'courses', localField: 'lesson.course', foreignField: '_id', as: 'course' } },
            { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } },
            {
              $project: {
                completedAt: 1,
                lessonName: '$lesson.lessonName',
                courseName: '$course.courseName',
              },
            },
          ],
          as: 'lastTask',
        },
      },
      {
        $lookup: {
          from: 'usercourseaccesses',
          let: { userId: '$_id', now: '$$NOW' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$user', '$$userId'] },
                    { $eq: ['$active', true] },
                    {
                      $or: [
                        { $eq: [{ $ifNull: ['$accessEndDate', null] }, null] },
                        { $gt: ['$accessEndDate', '$$now'] },
                      ],
                    },
                  ],
                },
              },
            },
            { $project: { course: 1, trialPeriod: { $ifNull: ['$trialPeriod', false] }, accessStartDate: 1 } },
            { $lookup: { from: 'courses', localField: 'course', foreignField: '_id', as: 'course' } },
            { $unwind: '$course' },
            {
              $lookup: {
                from: 'lessons',
                let: { cId: '$course._id' },
                pipeline: [{ $match: { $expr: { $eq: ['$course', '$$cId'] } } }, { $count: 'cnt' }],
                as: 'lessonsCnt',
              },
            },
            { $addFields: { totalLessons: { $ifNull: [{ $arrayElemAt: ['$lessonsCnt.cnt', 0] }, 0] } } },
            {
              $group: {
                _id: '$course._id',
                courseName: { $first: '$course.courseName' },
                trialPeriod: { $first: '$trialPeriod' },
                accessStartDate: { $min: '$accessStartDate' },
                totalLessons: { $first: '$totalLessons' },
              },
            },
            {
              $project: {
                _id: 0,
                courseId: '$_id',
                courseName: 1,
                trialPeriod: 1,
                accessStartDate: 1,
                totalLessons: 1,
              },
            },
          ],
          as: 'availableCourses',
        },
      },
      ...(args.courseId ? [{ $match: { 'availableCourses.courseId': new Types.ObjectId(args.courseId) } }] : []),
      {
        $lookup: {
          from: 'usertaskprogresses',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$user', '$$userId'] }, { $eq: ['$completed', true] }] } } },
            { $project: { task: 1 } },
            { $lookup: { from: 'tasks', localField: 'task', foreignField: '_id', as: 'task' } },
            { $unwind: '$task' },
            { $lookup: { from: 'lessons', localField: 'task.lessonCode', foreignField: 'lessonCode', as: 'lesson' } },
            { $unwind: '$lesson' },
            { $group: { _id: { course: '$lesson.course', lesson: '$lesson._id' } } },
            { $group: { _id: '$_id.course', completedLessons: { $sum: 1 } } },
          ],
          as: 'completedLessonsAgg',
        },
      },
      {
        $addFields: {
          hasMentorSupport: { $ifNull: ['$hasMentorSupport', true] },

          lastActiveDate: { $arrayElemAt: ['$lastTask.completedAt', 0] },
          lastActiveLesson: {
            $let: {
              vars: {
                c: { $arrayElemAt: ['$lastTask.courseName', 0] },
                l: { $arrayElemAt: ['$lastTask.lessonName', 0] },
              },
              in: { $cond: [{ $and: ['$$c', '$$l'] }, { $concat: ['$$c', ' – ', '$$l'] }, '$$l'] },
            },
          },
          lastActiveDays: {
            $cond: [
              { $gt: [{ $size: '$lastTask' }, 0] },
              {
                $round: [
                  {
                    $divide: [{ $subtract: ['$$NOW', { $arrayElemAt: ['$lastTask.completedAt', 0] }] }, 86_400_000],
                  },
                  0,
                ],
              },
              null,
            ],
          },
          isFrozen: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: { $ifNull: ['$freezes', []] },
                    as: 'f',
                    cond: {
                      $and: [{ $lte: ['$$f.startDate', '$$NOW'] }, { $gte: ['$$f.endDate', '$$NOW'] }],
                    },
                  },
                },
              },
              0,
            ],
          },
          coursesProgress: {
            $map: {
              input: { $ifNull: ['$availableCourses', []] },
              as: 'ac',
              in: {
                courseId: '$$ac.courseId',
                courseName: '$$ac.courseName',
                totalLessons: { $ifNull: ['$$ac.totalLessons', 0] },
                completedLessons: {
                  $let: {
                    vars: {
                      m: {
                        $first: {
                          $filter: {
                            input: { $ifNull: ['$completedLessonsAgg', []] },
                            as: 'ca',
                            cond: { $eq: ['$$ca._id', '$$ac.courseId'] },
                          },
                        },
                      },
                    },
                    in: { $ifNull: ['$$m.completedLessons', 0] },
                  },
                },
                label: {
                  $let: {
                    vars: {
                      comp: {
                        $let: {
                          vars: {
                            m: {
                              $first: {
                                $filter: {
                                  input: { $ifNull: ['$completedLessonsAgg', []] },
                                  as: 'ca',
                                  cond: { $eq: ['$$ca._id', '$$ac.courseId'] },
                                },
                              },
                            },
                          },
                          in: { $ifNull: ['$$m.completedLessons', 0] },
                        },
                      },
                    },
                    in: {
                      $concat: [
                        { $toString: '$$comp' },
                        ' из ',
                        { $toString: { $ifNull: ['$$ac.totalLessons', 0] } },
                        ' уроков ',
                        '$$ac.courseName',
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    ];

    const postMatch: MongoFilter = {};
    if (args.idle) {
      postMatch.lastActiveDays = { $gt: 5 };
    }
    if (args.todayOnly) {
      postMatch.lastActiveDays = 0;
    }
    if (args.status === 'active') {
      postMatch.$and = [{ lastActiveDays: { $ne: null } }, { lastActiveDays: { $lte: 5 } }];
    }
    if (args.status === 'stop') {
      postMatch.$or = [{ lastActiveDays: null }, { lastActiveDays: { $gt: 5 } }];
    }
    if (args.plan) {
      postMatch['availableCourses.trialPeriod'] = args.plan === 'trial';
    }
    if (Object.keys(postMatch).length) {
      pipeline.push({ $match: postMatch });
    }

    pipeline.push(
      {
        $project: {
          _id: 1,
          userName: 1,
          userRole: 1,
          phoneNumber: 1,

          hasMentorSupport: 1,
          isFrozen: 1,

          lastActiveDate: 1,
          lastActiveLesson: 1,
          lastActiveDays: 1,

          availableCourses: 1,
          coursesProgress: 1,

          freezes: {
            $map: {
              input: { $ifNull: ['$freezes', []] },
              as: 'f',
              in: {
                startDate: '$$f.startDate',
                endDate: '$$f.endDate',
              },
            },
          },
        },
      },
      { $skip: skip },
      { $limit: pageSize },
    );

    const [items, totalArr] = await Promise.all([
      this.userModel.aggregate<MonitoringDto>(pipeline).exec(),
      this.userModel.aggregate<CountDoc>([...pipeline.slice(0, -2), { $count: 'cnt' }]).exec(),
    ]);

    return { total: totalArr[0]?.cnt ?? 0, items };
  }
}
