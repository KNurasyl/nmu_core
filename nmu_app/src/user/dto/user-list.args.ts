import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';

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
