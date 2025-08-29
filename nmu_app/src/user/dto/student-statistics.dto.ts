import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CourseMiniType {
  @Field()
  id: string;

  @Field()
  courseName: string;
}

@ObjectType()
export class CourseStatisticsType {
  @Field(() => CourseMiniType)
  course: CourseMiniType;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class StudentStatisticsType {
  @Field(() => Int)
  totalStudents: number;

  @Field(() => Int)
  activeStudents: number;

  @Field(() => Int)
  frozenStudents: number;

  @Field(() => Int)
  noMentorStudents: number;

  @Field(() => [CourseStatisticsType])
  courseStudents: CourseStatisticsType[];
}
