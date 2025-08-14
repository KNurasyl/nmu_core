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
export class CourseProgressDto {
  @Field()
  courseId: string;

  @Field()
  courseName: string;

  @Field(() => Int)
  completedLessons: number;

  @Field(() => Int)
  totalLessons: number;

  @Field()
  label: string;
}

/** Период заморозки (только даты: от/до) */
@ObjectType()
export class FreezeDto {
  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}

@ObjectType()
export class MonitoringDto {
  @Field()
  _id: string;

  @Field()
  userName: string;

  @Field()
  userRole: string;

  @Field()
  hasMentorSupport?: boolean;

  @Field({ nullable: true })
  isFrozen?: boolean;

  @Field(() => [FreezeDto], { nullable: true })
  freezes?: FreezeDto[];

  @Field({ nullable: true })
  lastActiveDate?: Date;

  @Field({ nullable: true })
  lastActiveLesson?: string;

  @Field(() => Int, { nullable: true })
  lastActiveDays?: number;

  @Field(() => [CourseInfoDto])
  availableCourses: CourseInfoDto[];

  @Field(() => [CourseProgressDto])
  coursesProgress: CourseProgressDto[];

  @Field()
  phoneNumber: string;
}

@ObjectType()
export class UserMonitoringPaginated {
  @Field(() => Int)
  total: number;

  @Field(() => [MonitoringDto])
  items: MonitoringDto[];
}
