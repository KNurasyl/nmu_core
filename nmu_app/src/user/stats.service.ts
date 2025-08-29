import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CourseStatisticsType, StudentStatisticsType } from './dto/student-statistics.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class StudentStatisticsService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getStatistics(): Promise<StudentStatisticsType> {
    const now = new Date();
    const rolesFilter = { userRole: { $nin: ['admin', 'developer'] } };

    const [totalStudents, activeStudents, frozenStudents, noMentorStudents, courseStudents] = await Promise.all([
      // 1) Всего студентов
      this.userModel.countDocuments(rolesFilter),

      // 2) Учатся сейчас: есть активный доступ И хотя бы по одному доступному курсу прогресс < 100%
      this.userModel
        .aggregate<{ cnt: number }>([
          { $match: rolesFilter },
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
                { $project: { course: 1 } },
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
                { $project: { courseId: '$course._id', totalLessons: 1 } },
                {
                  $group: {
                    _id: '$courseId',
                    totalLessons: { $first: '$totalLessons' },
                  },
                },
                { $project: { _id: 0, courseId: '$_id', totalLessons: 1 } },
              ],
              as: 'availableCourses',
            },
          },
          { $match: { 'availableCourses.0': { $exists: true } } },
          {
            $lookup: {
              from: 'userlessonprogresses',
              let: { userId: '$_id' },
              pipeline: [
                { $match: { $expr: { $and: [{ $eq: ['$user', '$$userId'] }, { $eq: ['$completed', true] }] } } },
                { $group: { _id: '$course', completedLessons: { $sum: 1 } } },
              ],
              as: 'completedLessonsAgg',
            },
          },
          {
            $addFields: {
              hasIncompleteCourse: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: { $ifNull: ['$availableCourses', []] },
                        as: 'ac',
                        cond: {
                          $let: {
                            vars: {
                              total: { $ifNull: ['$$ac.totalLessons', 0] },
                              comp: {
                                $ifNull: [
                                  {
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
                                      in: '$$m.completedLessons',
                                    },
                                  },
                                  0,
                                ],
                              },
                            },
                            in: { $lt: ['$$comp', '$$total'] },
                          },
                        },
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
          { $match: { hasIncompleteCourse: true } },
          { $count: 'cnt' },
        ])
        .then((r) => r[0]?.cnt ?? 0),

      // 4) На заморозке сейчас
      this.userModel.countDocuments({
        ...rolesFilter,
        freezes: { $elemMatch: { startDate: { $lte: now }, endDate: { $gte: now } } },
      }),

      // 5) Без ментора
      this.userModel.countDocuments({ ...rolesFilter, hasMentorSupport: false }),

      // 3) По всем курсам: активный доступ к курсу + по ЭТОМУ курсу прогресс < 100%
      this.userModel
        .aggregate<{ _id: Types.ObjectId; count: number; course: { _id: Types.ObjectId; courseName: string } }>([
          { $match: rolesFilter },
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
                { $project: { course: 1 } },
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
                { $project: { courseId: '$course._id', totalLessons: 1 } },
                {
                  $group: {
                    _id: '$courseId',
                    totalLessons: { $first: '$totalLessons' },
                  },
                },
                { $project: { _id: 0, courseId: '$_id', totalLessons: 1 } },
              ],
              as: 'availableCourses',
            },
          },
          { $unwind: '$availableCourses' },
          {
            $addFields: {
              _courseId: '$availableCourses.courseId',
              _total: '$availableCourses.totalLessons',
            },
          },
          {
            $lookup: {
              from: 'userlessonprogresses',
              let: { userId: '$_id', cId: '$_courseId' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$user', '$$userId'] },
                        { $eq: ['$course', '$$cId'] },
                        { $eq: ['$completed', true] },
                      ],
                    },
                  },
                },
                { $group: { _id: null, completedLessons: { $sum: 1 } } },
              ],
              as: 'completedThisCourse',
            },
          },
          {
            $addFields: {
              _completed: { $ifNull: [{ $arrayElemAt: ['$completedThisCourse.completedLessons', 0] }, 0] },
            },
          },
          { $match: { $expr: { $lt: ['$_completed', '$_total'] } } },
          { $group: { _id: '$_courseId', count: { $sum: 1 } } },

          // подтягиваем сам курс
          { $lookup: { from: 'courses', localField: '_id', foreignField: '_id', as: 'course' } },
          { $unwind: '$course' },

          // финальная форма: course (id, name) + count
          {
            $project: {
              count: 1,
              course: {
                id: { $toString: '$_id' },
                courseName: '$course.courseName',
              },
            },
          },
        ])
        .then((agg) => agg as unknown as CourseStatisticsType[]),
    ]);

    return {
      totalStudents,
      activeStudents,
      frozenStudents,
      noMentorStudents,
      courseStudents,
    };
  }
}
