import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'getAllTasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'getTaskById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.taskService.findOne(id);
  }

  @Query(() => [Task], { name: 'getTasksByLesson' })
  findByLesson(@Args('lessonId', { type: () => String }) lessonId: string) {
    return this.taskService.findByLesson(lessonId);
  }

  @Mutation(() => Task, { name: 'updateTaskById' })
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task, { name: 'removeTaskById' })
  removeTask(@Args('id', { type: () => String }) id: string) {
    return this.taskService.remove(id);
  }
}
