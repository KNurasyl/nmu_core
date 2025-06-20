import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Types } from 'mongoose';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class UserTaskProgress {
  @Field(() => ID)
  _id: string;

  @Field(() => Task)
  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  task: Task;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Field(() => Boolean)
  @Prop({ default: false })
  completed: boolean;

  @Field(() => String, { nullable: true })
  @Prop({ default: '00:00' })
  elapsedTime: string;

  @Prop({ type: Object, nullable: true })
  @Field(() => GraphQLJSONObject)
  results: {
    taskType: string;
    correct: Record<string, any>[];
    inCorrect: Record<string, any>[];
  };

  @Field(() => Int, { nullable: true, description: 'Optional score or percent (0-100)' })
  @Prop({ required: false })
  score?: number;

  @Field({ nullable: true, description: 'Дата выполнения' })
  @Prop()
  completedAt?: Date;
}

export type UserTaskProgressDocument = UserTaskProgress & Document;
export const UserTaskProgressSchema = SchemaFactory.createForClass(UserTaskProgress);
