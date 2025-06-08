import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

const allowedOrigins = process?.env?.CORS_ORIGIN?.split(',')?.map((o) => o.trim())

app.enableCors({
  origin: allowedOrigins,
  credentials: true,
});

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);
  console.log(`CORS:${allowedOrigins}`);
  console.log(`🚀 App running on http://localhost:${port}`);
}
bootstrap();
