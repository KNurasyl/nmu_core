import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';
import { Task } from 'src/task/entities/task.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Lesson {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  lessonName: string;

  @Field()
  @Prop()
  lang: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ nullable: true })
  @Prop()
  videoUrl?: string;

  @Field()
  @Prop()
  order: number;

  @Field()
  @Prop()
  lessonCode: string;

  @Field(() => Course)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Field(() => [Task], { nullable: 'itemsAndList' })
  tasks?: Task[];
}

export type LessonDocument = Lesson & Document;
export const LessonSchema = SchemaFactory.createForClass(Lesson);

LessonSchema.virtual('tasks', {
  ref: 'Task',
  localField: 'lessonCode',
  foreignField: 'lessonCode',
});

LessonSchema.set('toObject', { virtuals: true });
LessonSchema.set('toJSON', { virtuals: true });
