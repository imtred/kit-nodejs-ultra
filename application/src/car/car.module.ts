import { Module } from '@nestjs/common';
import {AutomapperModule} from "nestjsx-automapper";
import {CarController} from "./car.controller";
import {MockCarRepository} from "../../../infrastructure/src/MockCarRepository";
import {ScheduleModule} from "nest-schedule";

@Module({
    imports: [
        AutomapperModule.forRoot(),
        ScheduleModule.register(),
    ],
    controllers: [CarController],
    providers: [
        {
            provide: "ICarRepository",
            useValue: new MockCarRepository()
        }
    ]
})
export class CarModule {}
