import {IsAlpha, IsDate} from "class-validator";
import {Transform, Type} from "class-transformer";
import * as moment from "moment";

export class OwnerRequest {
  @IsAlpha()
  public name: string;

  @IsDate()
  @Type(() => Date)
  @Transform(value => moment(value).toDate())
  public purchaseDate: Date;
}
