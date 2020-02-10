export class Manufacturer {
  private _name: string;
  private _phone: string;
  private _siret: number;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get siret(): number {
    return this._siret;
  }

  set siret(value: number) {
    this._siret = value;
  }
}
