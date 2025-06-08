import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsMongoId, IsOptional } from 'class-validator';

@InputType()
export class CreateUserLessonProgressInput {
  @Field(() => ID)
  @IsMongoId()
  userId: string;

  @Field(() => ID)
  @IsMongoId()
  lessonId: string;

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
