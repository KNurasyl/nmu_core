import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString({ message: 'userName must be string' })
  userName: string;

  @Field()
  @IsString({ message: 'phoneNumber must be string' })
  phoneNumber: string;

  @Field()
  @IsString({ message: 'password must be string' })
  password: string;

  @Field()
  @IsString({ message: 'Role name must be string' })
  userRole: string;
}
