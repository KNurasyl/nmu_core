import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from 'src/course/course.module';
import { UserModule } from 'src/user/user.module';
import { UserCourseAccess, UserCourseAccessSchema } from './entities/user-course-access.entity';
import { UserCourseAccessResolver } from './user-course-access.resolver';
import { UserCourseAccessService } from './user-course-access.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserCourseAccess.name, schema: UserCourseAccessSchema }]),
    UserModule,
    CourseModule,
  ],
  providers: [UserCourseAccessResolver, UserCourseAccessService],
  exports: [UserCourseAccessService],
})
export class UserCourseAccessModule {}
