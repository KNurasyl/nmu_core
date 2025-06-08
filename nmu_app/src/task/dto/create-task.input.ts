import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString({ message: 'Type name must be string' })
  type: string;

  @Field()
  @IsString({ message: 'Lesson code name must be string' })
  lessonCode: string;

  @Field()
  @IsOptional()
  @IsString({ message: 'Description name must be string' })
  description: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  data?: {
    [lang: string]: Record<string, any>[];
  };
}
