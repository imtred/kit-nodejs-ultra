import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Car} from "../../../domain/src/Car";
import {ManufactureResponse} from "../car/dto/response/manufacture.response";
import {map} from "rxjs/operators";
import {isArray} from "rxjs/internal-compatibility";


function ManufactureToResponse(car: Car): ManufactureResponse {
  const response: ManufactureResponse = new ManufactureResponse();

  response.name = car.manufacturer.name;
  response.phone = car.manufacturer.phone;
  response.siret = car.manufacturer.siret;

  return response;
}

type InputDataType = Car | Car[];
type OutputDataType = ManufactureResponse | ManufactureResponse[];


@Injectable()
export class ManufactureTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        map<InputDataType, OutputDataType>(car =>
            isArray(car) ? car.map(ManufactureToResponse) : ManufactureToResponse(car)
        )
    );
  }
}
