import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserTaskProgressInput } from './dto/create-user-task-progress.input';
import { UpdateUserTaskProgressInput } from './dto/update-user-task-progress.input';
import { UserTaskProgress } from './entities/user-task-progress.entity';
import { UserTaskProgressService } from './user-task-progress.service';

@Resolver(() => UserTaskProgress)
export class UserTaskProgressResolver {
  constructor(private readonly userTaskProgressService: UserTaskProgressService) {}

  @Mutation(() => UserTaskProgress)
  createUserTaskProgress(
    @Args('createUserTaskProgressInput') createUserTaskProgressInput: CreateUserTaskProgressInput,
  ) {
    return this.userTaskProgressService.create(createUserTaskProgressInput);
  }

  @Query(() => [UserTaskProgress], { name: 'userTaskProgress' })
  findAll() {
    return this.userTaskProgressService.findAll();
  }

  @Query(() => UserTaskProgress, { name: 'userTaskProgress' })
  findOne(@Args('id') id: string) {
    return this.userTaskProgressService.findOne(id);
  }

  @Mutation(() => UserTaskProgress)
  updateUserTaskProgress(
    @Args('updateUserTaskProgressInput') updateUserTaskProgressInput: UpdateUserTaskProgressInput,
  ) {
    return this.userTaskProgressService.update(updateUserTaskProgressInput.id, updateUserTaskProgressInput);
  }

  @Mutation(() => UserTaskProgress)
  removeUserTaskProgress(@Args('id') id: string) {
    return this.userTaskProgressService.remove(id);
  }
}
