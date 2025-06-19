import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsMongoId, IsOptional, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateUserTaskProgressInput {
  @Field(() => ID)
  @IsMongoId()
  userId: string;

  @Field(() => ID)
  @IsMongoId()
  taskId: string;

  @Field(() => ID)
  @IsMongoId()
  lessonId: string;

  @Field(() => ID)
  @IsMongoId()
  courseId: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  results: {
    taskType: string;
    correct: Record<string, any>[];
    inCorrect: Record<string, any>[];
  };

  @Field(() => String, { nullable: true })
  @IsString()
  elapsedTime: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  completed: boolean;

  @Field(() => Int, { nullable: true, description: 'Оценка или процент выполнения (0–100)' })
  @IsOptional()
  @IsInt()
  score?: number;

  @Field({ nullable: true, description: 'Дата выполнения' })
  @IsOptional()
  @IsDate()
  completedAt?: Date;
}
