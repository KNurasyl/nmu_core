import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonService } from 'src/lesson/lesson.service';
import {
  UserLessonProgress,
  UserLessonProgressDocument,
} from 'src/user-lesson-progress/entities/user-lesson-progress.entity';
import { CreateUserCourseProgressInput } from './dto/create-user-course-progress.input';
import { UpdateUserCourseProgressInput } from './dto/update-user-course-progress.input';
import { UserCourseProgress, UserCourseProgressDocument } from './entities/user-course-progress.entity';

@Injectable()
export class UserCourseProgressService {
  constructor(
    @Inject(LessonService)
    private readonly lessonService: LessonService,
    @InjectModel(UserCourseProgress.name)
    private readonly courseProgressModel: Model<UserCourseProgressDocument>,
    @InjectModel(UserLessonProgress.name)
    private readonly lessonProgressModel: Model<UserLessonProgressDocument>,
  ) {}

  async create(input: CreateUserCourseProgressInput): Promise<UserCourseProgress> {
    const created = new this.courseProgressModel(input);
    return await created.save();
  }

  async findAll(): Promise<UserCourseProgress[]> {
    return await this.courseProgressModel.find().populate('user').populate('course').exec();
  }

  async findOne(id: string): Promise<UserCourseProgress> {
    const found = await this.courseProgressModel.findById(id).populate('user').populate('course').exec();
    if (!found) throw new NotFoundException(`Прогресс по курсу с ID ${id} не найден`);
    return found;
  }

  async findByUserCourse(userId?: string, courseId?: string): Promise<UserCourseProgress> {
    const filter: { user?: Types.ObjectId; course?: Types.ObjectId } = {};

    if (userId) filter.user = new Types.ObjectId(userId);
    if (courseId) filter.course = new Types.ObjectId(courseId);

    const found = await this.courseProgressModel.findOne(filter).populate('user').populate('course').exec();

    if (!found) throw new NotFoundException(`Прогресс по заданным параметрам не найден`);
    return found;
  }

  async findAllOptional(userId: string): Promise<UserCourseProgress[]> {
    return await this.courseProgressModel
      .find({ user: new Types.ObjectId(userId) })
      .populate('course')
      .populate('user')
      .exec();
  }

  async update(id: string, input: UpdateUserCourseProgressInput): Promise<UserCourseProgress> {
    const updated = await this.courseProgressModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundException(`Прогресс по курсу с ID ${id} не найден`);
    return updated;
  }

  async remove(id: string): Promise<UserCourseProgress> {
    const deleted = await this.courseProgressModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Прогресс по курсу с ID ${id} не найден`);
    return deleted;
  }

  @OnEvent('lesson.completed')
  async handleLessonCompleted(payload: { userId: string; courseId: string }) {
    const { userId, courseId } = payload;

    // 1. Получить все уроки этого курса
    const allCourseLessons = await this.lessonService.findAllByCourse(courseId);
    const lessonIds = allCourseLessons.map((lesson) => lesson._id.toString());
    const totalLessons = lessonIds.length;

    if (totalLessons === 0) return;

    // 2. Найти прогресс пользователя по этим урокам
    const completedLessons = await this.lessonProgressModel.countDocuments({
      user: new Types.ObjectId(userId),
      lesson: { $in: lessonIds.map((id) => new Types.ObjectId(id)) },
      completed: true,
    });

    // 3. Высчитать процент
    const percent = Math.round((completedLessons / totalLessons) * 100);
    const isCompleted = percent === 100;

    // 4. Обновить или создать UserCourseProgress
    const existing = await this.courseProgressModel.findOne({
      user: new Types.ObjectId(userId),
      course: new Types.ObjectId(courseId),
    });

    if (existing) {
      existing.score = percent;
      existing.completed = isCompleted;
      existing.completedAt = isCompleted ? new Date() : undefined;
      await existing.save();
    } else {
      await this.courseProgressModel.create({
        user: new Types.ObjectId(userId),
        course: new Types.ObjectId(courseId),
        score: percent,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : undefined,
      });
    }
  }
}
