export class Owner {
  private _name: string;
  private _purchaseDate: Date;

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get purchaseDate(): Date {
    return this._purchaseDate;
  }
  set purchaseDate(value: Date) {
    this._purchaseDate = value;
  }
}
