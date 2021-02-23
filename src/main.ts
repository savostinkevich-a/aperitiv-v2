import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

const config = require("../config/config")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
  app.enableCors({
    origin: config.origin,
    credentials: true
  });

  await app.listen( process.env.PORT || 5000);
}
bootstrap();
