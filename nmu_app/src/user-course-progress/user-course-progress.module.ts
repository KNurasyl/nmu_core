import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from 'src/course/course.module';
import { LessonModule } from 'src/lesson/lesson.module';
import {
  UserLessonProgress,
  UserLessonProgressSchema,
} from 'src/user-lesson-progress/entities/user-lesson-progress.entity';
import { UserModule } from 'src/user/user.module';
import { UserCourseProgress, UserCourseProgressSchema } from './entities/user-course-progress.entity';
import { UserCourseProgressResolver } from './user-course-progress.resolver';
import { UserCourseProgressService } from './user-course-progress.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCourseProgress.name, schema: UserCourseProgressSchema },
      { name: UserLessonProgress.name, schema: UserLessonProgressSchema }, // ✅ ДОБАВЬ ЭТО
    ]),
    UserModule,
    CourseModule,
    LessonModule,
  ],
  providers: [UserCourseProgressResolver, UserCourseProgressService],
  exports: [UserCourseProgressService],
})
export class UserCourseProgressModule {}
