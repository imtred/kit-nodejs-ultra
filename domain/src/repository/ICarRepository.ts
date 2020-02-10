import { Car } from "../Car";

export interface ICarRepository {
  Save(car: Car): Promise<Car>;
  GetById(id: string): Promise<Car>;
  DeleteById(id: string): Promise<Car>;
  GetAll(): Promise<Car[]>;
  GetCarsForDiscount(): Promise<Car[]>;
}
