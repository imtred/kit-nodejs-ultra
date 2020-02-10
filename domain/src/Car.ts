import { Manufacturer } from "./Manufacturer";
import { Owner } from "./Owner";
import { v4 as uuid } from "uuid";
import { Discount } from "./Discount";
import * as moment from "moment";


export class Car {
  private readonly DISCOUNT_AMOUNT: number = 0.20;
  private readonly TRIGGER_MONTH_MIN: number = 12;
  private readonly TRIGGER_MONTH_MAX: number = 18;

  private _id: string = uuid();
  private _manufacturer: Manufacturer;
  private _price: number;
  private _firstRegistrationDate: Date;
  private _owners: Owner[];
  private _discount?: Discount;


  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get price(): number {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
  }

  get firstRegistrationDate(): Date {
    return this._firstRegistrationDate;
  }
  set firstRegistrationDate(value: Date) {
    this._firstRegistrationDate = value;
  }

  get manufacturer(): Manufacturer {
    return this._manufacturer;
  }
  set manufacturer(value: Manufacturer) {
    this._manufacturer = value;
  }

  get owners(): Owner[] {
    return this._owners;
  }
  set owners(value: Owner[]) {
    this._owners = value;
  }

  get discount(): Discount {
    return this._discount!;
  }

  set discount(value: Discount) {
    this._discount = value;
  }

  public CalculateDiscount(date: Date): Discount | undefined {
    const months = moment(date).diff(this.firstRegistrationDate, "months")
    if (months >= this.TRIGGER_MONTH_MIN && months <= this.TRIGGER_MONTH_MAX) {
      this.discount = new Discount();
      this.discount.amount = this.price * this.DISCOUNT_AMOUNT;
      return this.discount;
    }
    return undefined;
  }

  public RemoveAllOwners(date: Date): Owner[] | undefined {
    const months = moment(date).diff(this.firstRegistrationDate, "months")
    if (months >= this.TRIGGER_MONTH_MAX) {
      const owners = this.owners;
      this.owners = [];
      return owners;
    }
    return undefined;
  }
}
