import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
  app.enableCors({
    origin:  ['http://localhost:5000', 'http://localhost:3000', 'https://aperitiv.herokuapp.com/', 'http://192.168.0.110:3000'],
    credentials: true
  });

  await app.listen( process.env.PORT || 5000);
}
bootstrap();
