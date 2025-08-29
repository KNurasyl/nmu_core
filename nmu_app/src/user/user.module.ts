import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from 'src/lesson/entities/lesson.entity';
import { UserCourseAccess, UserCourseAccessSchema } from 'src/user-course-access/entities/user-course-access.entity';
import {
  UserCourseProgress,
  UserCourseProgressSchema,
} from 'src/user-course-progress/entities/user-course-progress.entity';
import {
  UserLessonProgress,
  UserLessonProgressSchema,
} from 'src/user-lesson-progress/entities/user-lesson-progress.entity';
import { UserTaskProgress, UserTaskProgressSchema } from 'src/user-task-progress/entities/user-task-progress.entity';
import { User, UserSchema } from './entities/user.entity';
import { FreezeCleanupService } from './freeze-cleanup.service';
import { UserMonitoringService } from './monitoring.service';
import { StudentStatisticsService } from './stats.service';
import { UserSeeder } from './user-seeder';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserCourseAccess.name, schema: UserCourseAccessSchema },
      { name: UserCourseProgress.name, schema: UserCourseProgressSchema },
      { name: UserLessonProgress.name, schema: UserLessonProgressSchema },
      { name: UserTaskProgress.name, schema: UserTaskProgressSchema },
      { name: UserCourseProgress.name, schema: UserCourseProgressSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    UserMonitoringService,
    UserSeeder,
    FreezeCleanupService,
    StudentStatisticsService,
  ],
  exports: [UserService, UserMonitoringService],
})
export class UserModule {}
