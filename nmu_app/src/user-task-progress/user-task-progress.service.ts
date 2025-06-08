import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { CreateUserTaskProgressInput } from './dto/create-user-task-progress.input';
import { UpdateUserTaskProgressInput } from './dto/update-user-task-progress.input';
import { UserTaskProgress, UserTaskProgressDocument } from './entities/user-task-progress.entity';

@Injectable()
export class UserTaskProgressService {
  constructor(
    private readonly eventEmitter: EventEmitter2,

    @Inject(TaskService)
    private readonly taskService: TaskService,
    @Inject(UserService)
    private readonly userService: UserService,
    @InjectModel(UserTaskProgress.name)
    private readonly userTaskProgressModel: Model<UserTaskProgressDocument>,
  ) {}

  async create(input: CreateUserTaskProgressInput): Promise<UserTaskProgress> {
    const { userId, taskId, lessonId, courseId } = input;

    const user = await this.userService.findOne(userId);
    const task = await this.taskService.findOne(taskId);

    // 🔍 Проверка: уже есть такая запись
    const existing = await this.userTaskProgressModel.findOne({
      user: user._id,
      task: task._id,
    });

    if (existing) {
      throw new BadRequestException('Вы уже выполнили эту задачу.');
    }

    const created = new this.userTaskProgressModel({
      task,
      user,
      ...input,
    });
    const saved = await created.save();

    // ✅ Эмитим событие
    this.eventEmitter.emit('task.completed', {
      userId,
      lessonId,
      courseId,
      lessonCode: task.lessonCode,
    });

    return saved;
  }

  async findAll(): Promise<UserTaskProgress[]> {
    return await this.userTaskProgressModel.find().populate('user').populate('task').exec();
  }

  async findOne(id: string): Promise<UserTaskProgress> {
    const progress = await this.userTaskProgressModel.findById(id).populate('user').populate('task').exec();

    if (!progress) throw new NotFoundException(`Прогресс с id ${id} не найден`);
    return progress;
  }

  async update(id: string, input: UpdateUserTaskProgressInput): Promise<UserTaskProgress> {
    const updated = await this.userTaskProgressModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundException(`Прогресс с id ${id} не найден`);
    return updated;
  }

  async remove(id: string): Promise<UserTaskProgress> {
    const deleted = await this.userTaskProgressModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Прогресс с id ${id} не найден`);
    return deleted;
  }
}
