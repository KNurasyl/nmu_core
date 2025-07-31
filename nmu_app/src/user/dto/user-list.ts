import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserPaginated {
  @Field(() => Int)
  total: number;

  @Field(() => [User])
  users: User[];
}

@ObjectType()
export class CourseInfoDto {
  @Field()
  courseId: string;

  @Field()
  courseName: string;

  @Field()
  trialPeriod: boolean;

  @Field({ nullable: true })
  accessStartDate?: Date;

  @Field({ nullable: true })
  accessEndDate?: Date;
}

@ObjectType()
export class MonitoringDto {
  @Field()
  _id: string;

  @Field()
  userName: string;

  @Field()
  userRole: string;

  @Field({ nullable: true })
  lastActiveDate?: Date;

  @Field({ nullable: true })
  lastActiveLesson?: string;

  @Field(() => Int, { nullable: true })
  lastActiveDays?: number;

  @Field(() => [CourseInfoDto])
  availableCourses: CourseInfoDto[];

  @Field(() => [CourseInfoDto])
  completedCourses: CourseInfoDto[];

  @Field()
  inactive: boolean;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  mentorName?: string;
}

@ObjectType()
export class UserMonitoringPaginated {
  @Field(() => Int)
  total: number;

  @Field(() => [MonitoringDto])
  items: MonitoringDto[];
}
