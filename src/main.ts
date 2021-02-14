import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: ['https://aperitiv.herokuapp.com/'],
    credentials: true
  });

  await app.listen( process.env.PORT || 5000);
}
bootstrap();
