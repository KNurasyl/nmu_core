import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';

@Schema({ timestamps: true })
@ObjectType()
export class Task {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field()
  type: string;

  @Prop({ type: Object, required: true })
  @Field(() => GraphQLJSONObject)
  data: {
    [lang: string]: Record<string, any>[];
  };

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Prop()
  @Field()
  lessonCode: string;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toObject', { virtuals: true });
TaskSchema.set('toJSON', { virtuals: true });
