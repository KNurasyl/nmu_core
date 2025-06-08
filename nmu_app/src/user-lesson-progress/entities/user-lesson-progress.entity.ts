import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class UserLessonProgress {
  @Field(() => ID)
  _id: string;

  @Field(() => Lesson)
  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lesson: Lesson;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Field(() => Boolean)
  @Prop({ default: false })
  completed: boolean;

  @Field(() => Int, { nullable: true, description: 'Optional score or percent (0-100)' })
  @Prop({ required: false })
  score?: number;

  @Field({ nullable: true, description: 'Дата выполнения' })
  @Prop()
  completedAt?: Date;
}

export type UserLessonProgressDocument = UserLessonProgress & Document;
export const UserLessonProgressSchema = SchemaFactory.createForClass(UserLessonProgress);
