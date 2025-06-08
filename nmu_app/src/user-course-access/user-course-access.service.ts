import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserCourseAccessInput } from './dto/create-user-course-access.input';
import { UpdateUserCourseAccessInput } from './dto/update-user-course-access.input';
import { UserCourseAccess, UserCourseAccessDocument } from './entities/user-course-access.entity';

@Injectable()
export class UserCourseAccessService {
  constructor(
    @InjectModel(UserCourseAccess.name)
    private readonly accessModel: Model<UserCourseAccessDocument>,
  ) {}

  async create(input: CreateUserCourseAccessInput): Promise<UserCourseAccess> {
    const created = new this.accessModel({
      ...input,
      user: new mongoose.Types.ObjectId(input.user),
      course: new mongoose.Types.ObjectId(input.course),
    });
    return await created.save();
  }

  async findAll(): Promise<UserCourseAccess[]> {
    return await this.accessModel.find().populate('user').populate('course').exec();
  }

  async findOne(id: string): Promise<UserCourseAccess> {
    const found = await this.accessModel.findById(id).populate('user').populate('course').exec();
    if (!found) throw new NotFoundException(`Доступ #${id} не найден`);
    return found;
  }

  async update(id: string, input: UpdateUserCourseAccessInput): Promise<UserCourseAccess> {
    const updated = await this.accessModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundException(`Доступ #${id} не найден`);
    return updated;
  }

  async remove(id: string): Promise<UserCourseAccess> {
    const deleted = await this.accessModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Доступ #${id} не найден`);
    return deleted;
  }
}
