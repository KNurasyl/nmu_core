import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput } from './dto/update-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPaginated } from './dto/user-list';
import { UserListArgs } from './dto/user-list.args';
import { User } from './entities/user.entity';
import { UserSeeder } from './user-seeder';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userSeeder: UserSeeder,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserPaginated)
  async getUsersPaginated(@Args('args') args: UserListArgs) {
    return this.userService.findAllPaginated(args);
  }

  @Query(() => User, { name: 'getUserById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUserById' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  async updateUserPassword(@Args('updatePasswordInput') input: UpdatePasswordInput) {
    return this.userService.updatePassword(input);
  }

  @Mutation(() => User, { name: 'removeUserById' })
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }

  @Mutation(() => String)
  async seedUsers(): Promise<string> {
    return await this.userSeeder.seedUsers(1000);
  }
}
