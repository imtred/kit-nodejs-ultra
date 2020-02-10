import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    UseInterceptors
} from "@nestjs/common";
import { CarRequest } from "./dto/request";
import { ICarRepository } from "../../../domain/src/repository/ICarRepository";
import { Car } from "../../../domain/src/Car";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { Manufacturer } from "../../../domain/src/Manufacturer";
import { Owner } from "../../../domain/src/Owner";
import {ManufactureTransformInterceptor, CarTransformInterceptor} from "../interactor";
import {Cron} from "nest-schedule";


@Controller("cars")
export class CarController {
  public constructor(
    @Inject("ICarRepository") private readonly carRepository: ICarRepository,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {}

  @Post()
  @UseInterceptors(new CarTransformInterceptor())
  public async Create(@Body() dto: CarRequest): Promise<Car> {
      const car = new Car();
      car.price = dto.price;
      car.firstRegistrationDate = dto.firstRegistrationDate;
      car.manufacturer = this.mapper.map(dto.manufacturer, Manufacturer);
      car.owners = this.mapper.mapArray(dto.owners, Owner);

      await this.carRepository.Save(car);

      return car;
  }

  @Put(":id")
  @UseInterceptors(new CarTransformInterceptor())
  public async UpdateById(
    @Param("id") id: string,
    @Body() dto: CarRequest
  ): Promise<Car> {
      const car: Car = await this.carRepository.GetById(id);

      car.price = dto.price;
      car.firstRegistrationDate = dto.firstRegistrationDate;
      car.manufacturer = this.mapper.map(dto.manufacturer, Manufacturer);
      car.owners = this.mapper.mapArray(dto.owners, Owner);

      // TODO: Add update method into ICarRepository

      return car;
  }

  @Delete(":id")
  @UseInterceptors(new CarTransformInterceptor())
  public async DeleteById(@Param("id") id: string): Promise<Car> {
      return await this.carRepository.DeleteById(id);
  }

  @Get()
  @UseInterceptors(new CarTransformInterceptor())
  public async ReadAll(): Promise<Car[]> {
    return await this.carRepository.GetAll();
  }

  @Get(":id")
  @UseInterceptors(new CarTransformInterceptor())
  public async ReadOneById(@Param("id") id: string): Promise<Car> {
      return  await this.carRepository.GetById(id);
  }

  @Get(":id/manufacture")
  @UseInterceptors(new ManufactureTransformInterceptor())
  public async ReadManufactureByCarId(@Param("id") id: string): Promise<Car> {
      return await this.carRepository.GetById(id);
  }

  @Post('/car-discount')
  @UseInterceptors(new CarTransformInterceptor())
  @Cron('0 0 1 * *')
  public async CalculateDiscount() {
      // TODO: Review this method (use Web-Queue-Worker pattern)
      const cars: Car[] = await this.carRepository.GetCarsForDiscount();
      const date = new Date();
      cars.forEach(car => {
          car.CalculateDiscount(date);
      });
      return cars;
  }

    @Delete('/deprecated-car-owners')
    @UseInterceptors(new CarTransformInterceptor())
    @Cron('0 0 1 * *')
    public async UpdateCars() {
        // TODO: Review this method (use Web-Queue-Worker pattern)
        const cars: Car[] = await this.carRepository.GetCarsForDiscount();
        const date = new Date();
        cars.forEach(car => {
            car.RemoveAllOwners(date);
        });
        return cars;
    }
}
