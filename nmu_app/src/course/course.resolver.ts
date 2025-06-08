import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Course } from './entities/course.entity';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
    return this.courseService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'getCourses' })
  findAll() {
    return this.courseService.findAll();
  }

  @Query(() => Course, { name: 'getCourseById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.courseService.findOne(id);
  }

  @Mutation(() => Course, { name: 'updateCourseById' })
  updateCourse(@Args('updateCourseInput') updateCourseInput: UpdateCourseInput) {
    return this.courseService.update(updateCourseInput.id, updateCourseInput);
  }

  @Mutation(() => Course, { name: 'removeCourseById' })
  removeCourse(@Args('id', { type: () => String }) id: string) {
    return this.courseService.remove(id);
  }
}
