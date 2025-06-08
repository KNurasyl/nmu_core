import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Course, CourseDocument } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseInput: CreateCourseInput): Promise<Course> {
    const course = new this.courseModel(createCourseInput);
    return await course.save();
  }

  async findByNameAndLang(courseName: string, lang: string) {
    return await this.courseModel.findOne({ courseName, lang });
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().populate('lessons').exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }

  async update(id: string, updateCourseInput: UpdateCourseInput): Promise<Course> {
    const course = await this.courseModel.findByIdAndUpdate(id, updateCourseInput, {
      new: true,
      runValidators: true,
    });
    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }

  async remove(id: string): Promise<Course> {
    const course = await this.courseModel.findByIdAndDelete(id);
    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }
}
