import {IsDate, IsNumber, ValidateNested} from "class-validator";
import {Transform, Type} from "class-transformer";
import {ManufactureRequest} from "./manufacture.request";
import {OwnerRequest} from "./owner.request";
import * as moment from "moment";

export class CarRequest {
  @IsNumber()
  public price: number;

  @IsDate()
  @Type(() => Date)
  @Transform(value => moment(value).toDate())
  public firstRegistrationDate: Date;

  @ValidateNested()
  @Type(() => ManufactureRequest)
  public manufacturer: ManufactureRequest;

  @ValidateNested()
  @Type(() => OwnerRequest)
  public owners: OwnerRequest[];
}
