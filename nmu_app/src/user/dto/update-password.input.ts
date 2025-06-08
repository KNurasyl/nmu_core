import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
@InputType()
export class UpdatePasswordInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @Field()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
