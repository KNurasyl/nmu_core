import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonService } from 'src/lesson/lesson.service';
import { Task, TaskDocument } from 'src/task/entities/task.entity';
import { UserTaskProgress, UserTaskProgressDocument } from 'src/user-task-progress/entities/user-task-progress.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserLessonProgressInput } from './dto/create-user-lesson-progress.input';
import { UpdateUserLessonProgressInput } from './dto/update-user-lesson-progress.input';
import { UserLessonProgress, UserLessonProgressDocument } from './entities/user-lesson-progress.entity';

@Injectable()
export class UserLessonProgressService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectModel(UserLessonProgress.name)
    private readonly lessonProgressModel: Model<UserLessonProgressDocument>,
    @InjectModel(UserTaskProgress.name)
    private readonly userTaskProgressModel: Model<UserTaskProgressDocument>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(LessonService)
    private readonly lessonService: LessonService,
  ) {}

  async create(input: CreateUserLessonProgressInput): Promise<UserLessonProgress> {
    const { userId, lessonId } = input;

    await this.userService.findOne(userId);
    await this.lessonService.findOne(lessonId);

    const created = new this.lessonProgressModel(input);

    return await created.save();
  }

  async update(id: string, input: UpdateUserLessonProgressInput): Promise<UserLessonProgress> {
    const updated = await this.lessonProgressModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundException(`UserLessonProgress #${id} not found`);
    return updated;
  }

  async findAll(): Promise<UserLessonProgress[]> {
    return this.lessonProgressModel.find().exec();
  }

  async findAllOptional(userId: string): Promise<UserLessonProgress[]> {
    return await this.lessonProgressModel
      .find({ user: new Types.ObjectId(userId) })
      .populate('lesson')
      .populate('user')
      .exec();
  }

  async findOne(id: string): Promise<UserLessonProgress> {
    const found = await this.lessonProgressModel.findById(id);
    if (!found) throw new NotFoundException(`UserLessonProgress #${id} not found`);
    return found;
  }

  async remove(id: string): Promise<UserLessonProgress> {
    const removed = await this.lessonProgressModel.findByIdAndDelete(id);
    if (!removed) throw new NotFoundException(`UserLessonProgress #${id} not found`);
    return removed;
  }

  @OnEvent('task.completed')
  async handleTaskCompleted(payload: { userId: string; lessonId: string; lessonCode: string; courseId: string }) {
    const { userId, lessonId, lessonCode, courseId } = payload;

    // 1. Найти все таски этого урока
    const tasks = await this.taskModel.find({ lessonCode });
    const taskIds = tasks.map((t) => new Types.ObjectId(t._id)); // 👈 Обязательно приводим к ObjectId

    if (taskIds.length === 0) return; // нет тасков – выходим

    // 2. Посчитать, сколько из них уже выполнено
    const completedCount = await this.userTaskProgressModel.countDocuments({
      user: new Types.ObjectId(userId),
      task: { $in: taskIds },
      completed: true,
    });

    // 3. Высчитать процент
    const percent = Math.round((completedCount / taskIds.length) * 100);
    const isCompleted = percent === 100;

    // 4. Обновить или создать прогресс
    const existingProgress = await this.lessonProgressModel.findOne({
      user: new Types.ObjectId(userId),
      lesson: new Types.ObjectId(lessonId),
    });

    if (existingProgress) {
      existingProgress.score = percent;
      existingProgress.completed = isCompleted;
      existingProgress.completedAt = isCompleted ? new Date() : undefined;
      await existingProgress.save();
    } else {
      await this.lessonProgressModel.create({
        user: new Types.ObjectId(userId),
        lesson: new Types.ObjectId(lessonId),
        score: percent,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : undefined,
      });
    }

    // ✅ Эмитим событие о завершении урока
    if (isCompleted) {
      this.eventEmitter.emit('lesson.completed', {
        userId,
        lessonId,
        courseId,
      });
    }
  }
}
