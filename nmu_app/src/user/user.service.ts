import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { FilterQuery, Model } from 'mongoose';
import { UserCourseProgress } from 'src/user-course-progress/entities/user-course-progress.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput } from './dto/update-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserListArgs } from './dto/user-list.args';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(UserCourseProgress.name)
    private userCourseProgressModel: Model<UserCourseProgress>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.userModel.create(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findAllPaginated(args: UserListArgs) {
    const { page, pageSize, roles, search } = args;

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const filter: FilterQuery<UserDocument> = {};

    if (roles && roles.length > 0) {
      filter.userRole = { $in: roles };
    }
    if (search) {
      filter.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await this.userModel.find(filter).skip(skip).limit(parseInt(pageSize));
    const total = await this.userModel.countDocuments(filter);
    return { total, users };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate({ path: 'courseAccesses', populate: { path: 'course' } })
      .exec();

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async findByPhone(phone: string): Promise<User> {
    const user = await this.userModel.findOne({ phoneNumber: phone }).exec();
    if (!user) throw new NotFoundException(`User with phoneNumber: ${phone} not found`);
    return user;
  }

  async findByRefreshToken(refreshToken: string): Promise<User> {
    const user = await this.userModel.findOne({ refreshToken }).exec();
    if (!user) throw new NotFoundException(`User with refreshToken: ${refreshToken} not found`);
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async updatePassword(input: UpdatePasswordInput): Promise<User | null> {
    const { userId, oldPassword, newPassword } = input;

    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('Пользователь не найден');

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new UnauthorizedException('Старый пароль неверен');

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    return await user.save();
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return this.userModel.findByIdAndUpdate(userId, { refreshToken }, { new: true });
  }
}
