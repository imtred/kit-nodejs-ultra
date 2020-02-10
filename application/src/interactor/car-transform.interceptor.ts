import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Car} from "../../../domain/src/Car";
import {CarResponse} from "../car/dto/response";
import {map} from "rxjs/operators";
import {isArray} from "rxjs/internal-compatibility";


function CarToResponse(car: Car): CarResponse {
  const response: CarResponse = new CarResponse();

  response.id = car.id;
  response.price = car.price;
  response.discount = car.discount !== undefined ? car.discount.amount : 0;
  response.firstRegistrationDate = car.firstRegistrationDate;

  return response;
}

type InputDataType = Car | Car[];
type OutputDataType = CarResponse | CarResponse[];

@Injectable()
export class CarTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        map<InputDataType, OutputDataType>(car =>
            isArray(car) ? car.map(CarToResponse) : CarToResponse(car)
        )
    );
  }
}
