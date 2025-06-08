import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserLessonProgressInput } from './create-user-lesson-progress.input';

@InputType()
export class UpdateUserLessonProgressInput extends PartialType(CreateUserLessonProgressInput) {
  @Field()
  id: string;
}
