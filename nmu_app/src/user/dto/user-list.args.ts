import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class UserListArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  page: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  pageSize: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  roles?: string[];

  @Field({ nullable: true })
  @IsOptional()
  search?: string;
}

@InputType()
export class UserMonitoringArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['active', 'stop'])
  status?: 'active' | 'stop';

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  idle?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  todayOnly?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['trial', 'full'])
  plan?: 'trial' | 'full';

  @Field(() => String, { nullable: true })
  @IsOptional()
  courseId?: string;
}
