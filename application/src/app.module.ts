import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CarModule } from './car/car.module';

import "./mapper";

@Module({
  imports: [CarModule],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
