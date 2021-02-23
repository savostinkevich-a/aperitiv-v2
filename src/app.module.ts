import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ConnectsModule } from './connects/connects.module';

const config = require('../config/config')


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
      exclude: ['/api*', '/graphql*'],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(config.dataBase),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: {
        settings: {
          "request.credentials": "include"
        }
      },
      debug: false,
      context: ({ req, res }) => ({ req, res }),
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      cors: {
        credentials: true,
        origin: config.origin,
      }
    }),
    AuthModule,
    ProductsModule,
    UploadModule,
    ConnectsModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
