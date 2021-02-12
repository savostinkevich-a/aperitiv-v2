import { Module } from '@nestjs/common';
import { ConnectsService } from './connects.service';
import { ConnectsResolver } from './connects.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import {Connect, ConnectSchema} from "./models/connect.model";

@Module({
  imports: [MongooseModule.forFeature([{name: Connect.name, schema: ConnectSchema}])],
  providers: [ConnectsService, ConnectsResolver]
})
export class ConnectsModule {}
