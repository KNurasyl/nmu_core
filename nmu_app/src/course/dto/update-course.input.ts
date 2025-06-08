import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateCourseInput } from './create-course.input';

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  @Field()
  @IsMongoId()
  id: string;
}
