import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { MonitoringDto, UserMonitoringPaginated } from './dto/user-list';
import { UserMonitoringArgs } from './dto/user-list.args';
import { User, UserDocument } from './entities/user.entity';

interface CountDoc {
  cnt: number;
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
      matchStage.$or = [{ phoneNumber: regex }, { userName: regex }];
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
            {
              $lookup: {
                from: 'tasks',
                localField: 'task',
                foreignField: '_id',
                as: 'task',
              },
            },
            { $unwind: { path: '$task', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'lessons',
                localField: 'task.lessonCode',
                foreignField: 'lessonCode',
                as: 'lesson',
              },
            },
            { $unwind: { path: '$lesson', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'courses',
                localField: 'lesson.course',
                foreignField: '_id',
                as: 'course',
              },
            },
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
            {
              $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course',
              },
            },
            { $unwind: '$course' },
            {
              $group: {
                _id: '$course._id',
                courseName: { $first: '$course.courseName' },
                trialPeriod: { $first: '$trialPeriod' },
                accessStartDate: { $min: '$accessStartDate' },
              },
            },
            {
              $project: {
                _id: 0,
                courseId: '$_id',
                courseName: 1,
                trialPeriod: 1,
                accessStartDate: 1,
              },
            },
          ],
          as: 'availableCourses',
        },
      },

      ...(args.courseId
        ? [
            {
              $match: { 'availableCourses.courseId': new Types.ObjectId(args.courseId) },
            },
          ]
        : []),
      {
        $lookup: {
          from: 'usercourseprogresses',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$user', '$$userId'] }, { $eq: ['$completed', true] }] } } },
            {
              $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course',
              },
            },
            { $unwind: '$course' },
            {
              $project: {
                _id: 0,
                courseId: '$course._id',
                courseName: '$course.courseName',
                trialPeriod: { $literal: false },
              },
            },
          ],
          as: 'completedCourses',
        },
      },
      {
        $addFields: {
          mentorObjId: {
            $cond: [{ $eq: [{ $type: '$mentorId' }, 'string'] }, { $toObjectId: '$mentorId' }, '$mentorId'],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'mentorObjId',
          foreignField: '_id',
          as: 'mentor',
        },
      },
      {
        $addFields: {
          lastActiveDate: { $arrayElemAt: ['$lastTask.completedAt', 0] },
          lastActiveLesson: {
            $let: {
              vars: {
                c: { $arrayElemAt: ['$lastTask.courseName', 0] },
                l: { $arrayElemAt: ['$lastTask.lessonName', 0] },
              },
              in: {
                $cond: [{ $and: ['$$c', '$$l'] }, { $concat: ['$$c', ' – ', '$$l'] }, '$$l'],
              },
            },
          },

          lastActiveDays: {
            $cond: [
              { $gt: [{ $size: '$lastTask' }, 0] },
              {
                $round: [
                  { $divide: [{ $subtract: ['$$NOW', { $arrayElemAt: ['$lastTask.completedAt', 0] }] }, 86_400_000] },
                  0,
                ],
              },
              null,
            ],
          },

          inactive: {
            $cond: [
              {
                $or: [
                  { $eq: [{ $size: '$lastTask' }, 0] },
                  {
                    $gt: [
                      {
                        $divide: [{ $subtract: ['$$NOW', { $arrayElemAt: ['$lastTask.completedAt', 0] }] }, 86_400_000],
                      },
                      5,
                    ],
                  },
                ],
              },
              true,
              false,
            ],
          },

          mentorName: { $arrayElemAt: ['$mentor.userName', 0] },
        },
      },
    ];

    const postMatch: Record<string, unknown> = {};
    if (args.idle) postMatch.lastActiveDays = { $gt: 5 };
    if (args.todayOnly) postMatch.lastActiveDays = 0;
    if (args.status === 'active') postMatch.inactive = false;
    if (args.status === 'stop') postMatch.inactive = true;
    if (args.plan) postMatch['availableCourses.trialPeriod'] = args.plan === 'trial';

    if (Object.keys(postMatch).length) pipeline.push({ $match: postMatch });

    pipeline.push(
      { $project: { password: 0, refreshToken: 0, mentor: 0, mentorObjId: 0 } },
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
