import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CourseModule } from 'src/course/course.module';
import { LessonModule } from 'src/lesson/lesson.module';
import { TaskModule } from 'src/task/task.module';
import { UploadContentController } from './upload-content.controller';
import { UploadContentService } from './upload-content.service';

@Module({
  imports: [CourseModule, LessonModule, TaskModule, AuthModule],
  controllers: [UploadContentController],
  providers: [UploadContentService],
})
export class UploadContentModule {}
