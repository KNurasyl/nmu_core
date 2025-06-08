import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class UserCourseProgress {
  @Field(() => ID)
  _id: string;

  @Field(() => Course)
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Course;

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

export type UserCourseProgressDocument = UserCourseProgress & Document;
export const UserCourseProgressSchema = SchemaFactory.createForClass(UserCourseProgress);
