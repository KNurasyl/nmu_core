import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Lesson } from 'src/lesson/entities/lesson.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Course {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  courseName: string;

  @Field()
  @Prop()
  lang: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field(() => [Lesson], { nullable: 'itemsAndList' })
  lessons?: Lesson[];
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
});

CourseSchema.set('toObject', { virtuals: true });
CourseSchema.set('toJSON', { virtuals: true });
