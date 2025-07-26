import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString({ message: 'User name must be string' })
  userName: string;

  @Field()
  @IsString({ message: 'Role name must be string' })
  userRole: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  mentorId?: string;

  @Field()
  @IsPhoneNumber('KZ')
  @IsString({ message: 'Phone number name must be string' })
  phoneNumber: string;

  @Field()
  @MinLength(4)
  password: string;
}
