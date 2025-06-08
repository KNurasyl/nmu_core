import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString({ message: 'phoneNumber must be string' })
  phoneNumber: string;

  @Field()
  @IsString({ message: 'password must be string' })
  password: string;
}
