import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateUserTaskProgressInput } from './create-user-task-progress.input';

@InputType()
export class UpdateUserTaskProgressInput extends PartialType(CreateUserTaskProgressInput) {
  @Field()
  @IsMongoId()
  id: string;
}
