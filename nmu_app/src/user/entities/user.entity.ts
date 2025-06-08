import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserCourseAccess } from 'src/user-course-access/entities/user-course-access.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  userName: string;

  @Field()
  @Prop()
  userRole: string;

  @Field()
  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop({ default: null })
  refreshToken?: string;

  @Field(() => [UserCourseAccess], { nullable: true })
  courseAccesses?: UserCourseAccess[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('courseAccesses', {
  ref: 'UserCourseAccess',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
