import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserPaginated {
  @Field(() => Int)
  total: number;

  @Field(() => [User])
  users: User[];
}
