import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsMongoId } from 'class-validator';

@InputType()
export class RefreshInput {
  @Field(() => ID)
  @IsMongoId({ message: 'userId должен быть валидным Mongo ObjectID' })
  userId: string;

  @Field()
  @IsString({ message: 'refreshToken должен быть строкой' })
  refreshToken: string;
}
