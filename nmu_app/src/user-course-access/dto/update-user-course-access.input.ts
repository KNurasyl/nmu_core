import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateUserCourseAccessInput } from './create-user-course-access.input';

@InputType()
export class UpdateUserCourseAccessInput extends PartialType(CreateUserCourseAccessInput) {
  @Field()
  @IsMongoId()
  id: string;
}
