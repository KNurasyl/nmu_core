import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserCourseAccess } from 'src/user-course-access/entities/user-course-access.entity';

@ObjectType()
@Schema({ _id: false })
export class FreezePeriod {
  @Field()
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Field()
  @Prop({ type: Date, required: true })
  endDate: Date;

  @Field({ nullable: true })
  @Prop()
  reason?: string;
}
export const FreezePeriodSchema = SchemaFactory.createForClass(FreezePeriod);

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

  @Field({ nullable: true })
  @Prop({ default: null })
  mentorId: string;

  @Field()
  @Prop()
  phoneNumber: string;

  @Field({ nullable: true })
  @Prop({ type: Boolean, default: true })
  hasMentorSupport?: boolean;

  @Field(() => [FreezePeriod], { nullable: true })
  @Prop({ type: [FreezePeriodSchema], default: [] })
  freezes?: FreezePeriod[];

  @Field({ nullable: true })
  isFrozen?: boolean;

  @Prop()
  password: string;

  @Prop({ default: null })
  refreshToken?: string;

  @Field(() => [UserCourseAccess], { nullable: true })
  courseAccesses?: UserCourseAccess[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ 'freezes.startDate': 1, 'freezes.endDate': 1 });

UserSchema.virtual('courseAccesses', {
  ref: 'UserCourseAccess',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.virtual('isFrozen').get(function (this: UserDocument) {
  const now = new Date();
  const arr: ReadonlyArray<FreezePeriod> = Array.isArray(this.freezes) ? this.freezes : [];
  return arr.some((f) => {
    const start = f.startDate instanceof Date ? f.startDate : new Date(f.startDate);
    const end = f.endDate instanceof Date ? f.endDate : new Date(f.endDate);
    return start <= now && now <= end;
  });
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
