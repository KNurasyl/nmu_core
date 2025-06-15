import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCourseAccessInput } from './dto/create-user-course-access.input';
import { UpdateUserCourseAccessInput } from './dto/update-user-course-access.input';
import { UserCourseAccess } from './entities/user-course-access.entity';
import { UserCourseAccessService } from './user-course-access.service';

@Resolver(() => UserCourseAccess)
export class UserCourseAccessResolver {
  constructor(private readonly userCourseAccessService: UserCourseAccessService) {}

  @Mutation(() => UserCourseAccess)
  createUserCourseAccess(
    @Args('createUserCourseAccessInput') createUserCourseAccessInput: CreateUserCourseAccessInput,
  ) {
    return this.userCourseAccessService.create(createUserCourseAccessInput);
  }

  @Query(() => [UserCourseAccess], { name: 'userCourseAccess' })
  findAll() {
    return this.userCourseAccessService.findAll();
  }

  @Query(() => UserCourseAccess, { name: 'userCourseAccess' })
  findOne(@Args('id') id: string) {
    return this.userCourseAccessService.findOne(id);
  }

  @Mutation(() => UserCourseAccess)
  updateUserCourseAccess(
    @Args('updateUserCourseAccessInput') updateUserCourseAccessInput: UpdateUserCourseAccessInput,
  ) {
    return this.userCourseAccessService.update(updateUserCourseAccessInput.id, updateUserCourseAccessInput);
  }

  @Mutation(() => UserCourseAccess)
  async setUserCourseAccessActive(@Args('id') id: string, @Args('active') active: boolean) {
    return this.userCourseAccessService.setActive(id, active);
  }

  @Mutation(() => UserCourseAccess)
  async setUserCourseAccessTrialPeriod(@Args('id') id: string, @Args('trialPeriod') trialPeriod: boolean) {
    return this.userCourseAccessService.setTrialPeriod(id, trialPeriod);
  }

  @Mutation(() => UserCourseAccess)
  removeUserCourseAccess(@Args('id') id: string) {
    return this.userCourseAccessService.remove(id);
  }
}
