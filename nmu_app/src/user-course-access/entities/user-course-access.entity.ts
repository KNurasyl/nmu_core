import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class UserCourseAccess {
  @Field(() => ID)
  _id: string;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Field(() => Course)
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Course;

  @Field({ nullable: true, description: 'Дата начала доступа' })
  @Prop()
  accessStartDate?: Date;

  @Field({ nullable: true, description: 'Дата окончания доступа' })
  @Prop()
  accessEndDate?: Date;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  active: boolean;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  trialPeriod: boolean;

  @Field({ nullable: true, description: 'Дополнительные примечания' })
  @Prop()
  comment?: string;
}

export type UserCourseAccessDocument = UserCourseAccess & Document;
export const UserCourseAccessSchema = SchemaFactory.createForClass(UserCourseAccess);
