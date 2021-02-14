import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:3000', ' https://aperitiv.herokuapp.com/'],
    credentials: true
  });

  await app.listen( 5000);
}
bootstrap();
