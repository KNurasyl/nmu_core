import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserLessonProgressInput } from './dto/create-user-lesson-progress.input';
import { UpdateUserLessonProgressInput } from './dto/update-user-lesson-progress.input';
import { UserLessonProgress } from './entities/user-lesson-progress.entity';
import { UserLessonProgressService } from './user-lesson-progress.service';

@Resolver(() => UserLessonProgress)
export class UserLessonProgressResolver {
  constructor(private readonly userLessonProgressService: UserLessonProgressService) {}

  @Mutation(() => UserLessonProgress)
  createUserLessonProgress(
    @Args('createUserLessonProgressInput') createUserLessonProgressInput: CreateUserLessonProgressInput,
  ) {
    return this.userLessonProgressService.create(createUserLessonProgressInput);
  }

  @Query(() => [UserLessonProgress], { name: 'userLessonProgress' })
  findAll() {
    return this.userLessonProgressService.findAll();
  }

  @Query(() => UserLessonProgress, { name: 'userLessonProgress' })
  findOne(@Args('id') id: string) {
    return this.userLessonProgressService.findOne(id);
  }

  @Mutation(() => UserLessonProgress)
  updateUserLessonProgress(
    @Args('updateUserLessonProgressInput') updateUserLessonProgressInput: UpdateUserLessonProgressInput,
  ) {
    return this.userLessonProgressService.update(updateUserLessonProgressInput.id, updateUserLessonProgressInput);
  }

  @Mutation(() => UserLessonProgress)
  removeUserLessonProgress(@Args('id') id: string) {
    return this.userLessonProgressService.remove(id);
  }
}
