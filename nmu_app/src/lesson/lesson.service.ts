import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Lesson, LessonDocument } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}

  async create(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = new this.lessonModel(createLessonInput);
    return await lesson.save();
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonModel.find().exec();
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).populate('tasks').exec();
    if (!lesson) throw new NotFoundException(`Lesson #${id} not found`);
    return lesson;
  }

  async findByCourse(courseId: string): Promise<Lesson[]> {
    return await this.lessonModel.find({ course: courseId }).exec();
  }

  async findAllByCourse(courseId: string): Promise<Lesson[]> {
    const lessons = await this.lessonModel.find({ course: courseId }).exec();
    if (!lessons) throw new NotFoundException(`Lesson by course id #${courseId} not found`);
    return lessons;
  }

  async update(id: string, updateLessonInput: UpdateLessonInput): Promise<Lesson> {
    const lesson = await this.lessonModel.findByIdAndUpdate(id, updateLessonInput, {
      new: true,
      runValidators: true,
    });
    if (!lesson) throw new NotFoundException(`Lesson #${id} not found`);
    return lesson;
  }

  async remove(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findByIdAndDelete(id);
    if (!lesson) throw new NotFoundException(`Lesson #${id} not found`);
    return lesson;
  }
}
