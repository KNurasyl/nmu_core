import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateUserCourseAccessInput {
  @Field(() => ID)
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @Field(() => ID)
  @IsMongoId()
  @IsNotEmpty()
  course: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  accessStartDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  accessEndDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  comment?: string;
}
