import { Test, TestingModule } from "@nestjs/testing";
import { CarController } from "./car.controller";
import {AutomapperModule} from "nestjsx-automapper";
import {ScheduleModule} from "nest-schedule";
import {MockCarRepository} from "../../../infrastructure/src/MockCarRepository";

describe("Car Controller", () => {
  let controller: CarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<CarController>(CarController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
