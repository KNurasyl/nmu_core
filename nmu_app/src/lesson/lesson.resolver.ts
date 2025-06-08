import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Lesson } from './entities/lesson.entity';
import { LessonService } from './lesson.service';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Mutation(() => Lesson)
  createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
    return this.lessonService.create(createLessonInput);
  }

  @Query(() => [Lesson], { name: 'getLessons' })
  findAll() {
    return this.lessonService.findAll();
  }

  @Query(() => Lesson, { name: 'getLessonById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lessonService.findOne(id);
  }

  @Query(() => [Lesson], { name: 'getLessonsByCourseId' })
  findByCourse(@Args('courseId', { type: () => String }) courseId: string) {
    return this.lessonService.findByCourse(courseId);
  }

  @Mutation(() => Lesson, { name: 'updateLessonById' })
  updateLesson(@Args('updateLessonInput') updateLessonInput: UpdateLessonInput) {
    return this.lessonService.update(updateLessonInput.id, updateLessonInput);
  }

  @Mutation(() => Lesson, { name: 'removeLessonById' })
  removeLesson(@Args('id', { type: () => String }) id: string) {
    return this.lessonService.remove(id);
  }
}
