import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @IsString({ message: 'Lesson name must be string' })
  lessonName: string;

  @Field()
  @IsString({ message: 'Lesson code name must be string' })
  lessonCode: string;

  @Field()
  @IsOptional()
  @IsString({ message: 'Description name must be string' })
  description: string;

  @Field()
  @IsOptional()
  videoUrl: string;

  @Field()
  @IsString({ message: 'Language name must be string' })
  lang: string;

  @Field()
  @IsNumber()
  order: number;

  @Field()
  @IsMongoId()
  course: string;
}
