import { Profile, AutoMapper } from "nestjsx-automapper";
import { MappingProfileBase } from "@nartc/automapper";
import { Manufacturer } from "../../../domain/src/Manufacturer";
import {ManufactureRequest} from "../car/dto/request/manufacture.request";

@Profile()
export class ManufacturerProfile extends MappingProfileBase {
  public constructor(mapper: AutoMapper) {
    super();

    mapper
      .createMap(Object, Manufacturer)
      .forMember(
        destination => destination.phone,
        opts => opts.mapFrom((source: ManufactureRequest) => source.phone)
      )
      .forMember(
        destination => destination.siret,
        opts => opts.mapFrom((source: ManufactureRequest) => source.siret)
      )
      .forMember(
        destination => destination.name,
        opts => opts.mapFrom((source: ManufactureRequest) => source.name)
      );

    mapper
      .createMap(ManufactureRequest, Manufacturer)
      .forMember(
          destination => destination.phone,
          opts => opts.mapFrom(source => source.phone)
      )
      .forMember(
          destination => destination.siret,
          opts => opts.mapFrom(source => source.siret)
      )
      .forMember(
          destination => destination.name,
          opts => opts.mapFrom(source => source.name)
      );
  }
}
