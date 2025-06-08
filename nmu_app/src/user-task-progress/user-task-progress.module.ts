import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from 'src/task/task.module';
import { UserModule } from 'src/user/user.module';
import { UserTaskProgress, UserTaskProgressSchema } from './entities/user-task-progress.entity';
import { UserTaskProgressResolver } from './user-task-progress.resolver';
import { UserTaskProgressService } from './user-task-progress.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserTaskProgress.name, schema: UserTaskProgressSchema }]),
    UserModule,
    TaskModule,
  ],
  providers: [UserTaskProgressResolver, UserTaskProgressService],
  exports: [UserTaskProgressService],
})
export class UserTaskProgressModule {}
