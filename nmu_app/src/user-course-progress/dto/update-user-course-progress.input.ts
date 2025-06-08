import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateUserCourseProgressInput } from './create-user-course-progress.input';

@InputType()
export class UpdateUserCourseProgressInput extends PartialType(CreateUserCourseProgressInput) {
  @Field()
  @IsMongoId()
  id: string;
}
