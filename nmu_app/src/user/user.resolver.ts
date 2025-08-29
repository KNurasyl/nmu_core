import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { FreezeUserInput } from './dto/freeze-user.input';
import { StudentStatisticsType } from './dto/student-statistics.dto';
import { UpdatePasswordInput } from './dto/update-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserMonitoringPaginated, UserPaginated } from './dto/user-list';
import { UserListArgs, UserMonitoringArgs } from './dto/user-list.args';
import { User } from './entities/user.entity';
import { UserMonitoringService } from './monitoring.service';
import { StudentStatisticsService } from './stats.service';
import { UserSeeder } from './user-seeder';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly monitoringService: UserMonitoringService,
    private readonly userSeeder: UserSeeder,
    private readonly studentStatisticsService: StudentStatisticsService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserMonitoringPaginated, { name: 'getMonitoring' })
  getMonitoring(@Args('args') args: UserMonitoringArgs) {
    return this.monitoringService.getMonitoring(args);
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

  @Mutation(() => User)
  setUserMentorSupport(
    @Args('userId', { type: () => String }) userId: string,
    @Args('enabled', { type: () => Boolean }) enabled: boolean,
  ) {
    return this.userService.setMentorSupport(userId, enabled);
  }

  @Mutation(() => User)
  stopUserMentorSupport(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.stopMentorSupport(userId);
  }

  @Mutation(() => User)
  startUserMentorSupport(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.startMentorSupport(userId);
  }

  @Mutation(() => User)
  freezeUser(@Args('input') input: FreezeUserInput) {
    return this.userService.freezeUser(input);
  }

  @Query(() => StudentStatisticsType, { name: 'studentStatistics' })
  studentStatistics() {
    return this.studentStatisticsService.getStatistics();
  }

  @Mutation(() => User)
  unfreezeUser(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.unfreezeUser(userId);
  }
}
