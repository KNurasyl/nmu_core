import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Developer = 'developer',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
