import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtPayload } from './common/types/jwt-payload';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { TaskModule } from './task/task.module';
import { UploadContentModule } from './upload-content/upload-content.module';
import { UserCourseAccessModule } from './user-course-access/user-course-access.module';
import { UserCourseProgressModule } from './user-course-progress/user-course-progress.module';
import { UserLessonProgressModule } from './user-lesson-progress/user-lesson-progress.module';
import { UserTaskProgressModule } from './user-task-progress/user-task-progress.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtService = new JwtService({
          secret: configService.get<string>('JWT_SECRET'),
        });

        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          playground: true,
          installSubscriptionHandlers: true,
          context: ({ req, res }) => {
            const token: string | undefined = req?.headers?.authorization?.replace('Bearer ', '');
            let user: JwtPayload | null = null;

            if (token) {
              try {
                user = jwtService.verify<JwtPayload>(token);
              } catch (err: unknown) {
                if (err instanceof Error) {
                  console.warn('❗ Invalid token:', err.message);
                } else {
                  console.warn('❗ Invalid token: Unknown error');
                }
              }
            }

            return { req, res, user };
          },
        };
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        const dbName = configService.get<string>('MONGODB_DB');
        console.log('[MongoDB] Trying to connect with URI:', uri);
        console.log('[MongoDB] Using dbName:', dbName);

        return {
          uri,
          dbName,
          // (можно добавить другие опции)
        };
      },
    }),
    UserModule,
    CourseModule,
    LessonModule,
    UploadContentModule,
    TaskModule,
    UserTaskProgressModule,
    UserLessonProgressModule,
    UserCourseProgressModule,
    UserCourseAccessModule,
    AuthModule,
  ],
})
export class AppModule {}
