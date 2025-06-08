import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCourseProgressInput } from './dto/create-user-course-progress.input';
import { UpdateUserCourseProgressInput } from './dto/update-user-course-progress.input';
import { UserCourseProgress } from './entities/user-course-progress.entity';
import { UserCourseProgressService } from './user-course-progress.service';

@Resolver(() => UserCourseProgress)
export class UserCourseProgressResolver {
  constructor(private readonly userCourseProgressService: UserCourseProgressService) {}

  @Mutation(() => UserCourseProgress)
  createUserCourseProgress(
    @Args('createUserCourseProgressInput') createUserCourseProgressInput: CreateUserCourseProgressInput,
  ) {
    return this.userCourseProgressService.create(createUserCourseProgressInput);
  }

  @Query(() => [UserCourseProgress], { name: 'userCourseProgress' })
  findAll() {
    return this.userCourseProgressService.findAll();
  }

  @Query(() => [UserCourseProgress], { name: 'userCourseProgressByUser' })
  findByUser(@Args('userId') userId: string) {
    return this.userCourseProgressService.findByUser(userId);
  }

  @Query(() => UserCourseProgress, { name: 'userCourseProgress' })
  findOne(@Args('id') id: string) {
    return this.userCourseProgressService.findOne(id);
  }

  @Mutation(() => UserCourseProgress)
  updateUserCourseProgress(
    @Args('updateUserCourseProgressInput') updateUserCourseProgressInput: UpdateUserCourseProgressInput,
  ) {
    return this.userCourseProgressService.update(updateUserCourseProgressInput.id, updateUserCourseProgressInput);
  }

  @Mutation(() => UserCourseProgress)
  removeUserCourseProgress(@Args('id') id: string) {
    return this.userCourseProgressService.remove(id);
  }
}
