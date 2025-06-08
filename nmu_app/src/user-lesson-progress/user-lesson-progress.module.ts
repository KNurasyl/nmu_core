import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonModule } from 'src/lesson/lesson.module';
import { Task, TaskSchema } from 'src/task/entities/task.entity';
import { UserTaskProgress, UserTaskProgressSchema } from 'src/user-task-progress/entities/user-task-progress.entity';
import { UserModule } from 'src/user/user.module';
import { UserLessonProgress, UserLessonProgressSchema } from './entities/user-lesson-progress.entity';
import { UserLessonProgressResolver } from './user-lesson-progress.resolver';
import { UserLessonProgressService } from './user-lesson-progress.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLessonProgress.name, schema: UserLessonProgressSchema },
      { name: UserTaskProgress.name, schema: UserTaskProgressSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    UserModule,
    LessonModule,
  ],
  providers: [UserLessonProgressService, UserLessonProgressResolver],
})
export class UserLessonProgressModule {}
