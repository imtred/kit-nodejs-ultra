import { Profile, AutoMapper } from "nestjsx-automapper";
import { MappingProfileBase } from "@nartc/automapper";
import { Owner } from "../../../domain/src/Owner";
import {OwnerRequest} from "../car/dto/request/owner.request";

@Profile()
export class OwnerProfile extends MappingProfileBase {
  public constructor(mapper: AutoMapper) {
    super();

    mapper
      .createMap(Object, Owner)
      .forMember(
        destination => destination.name,
        opts => opts.mapFrom((source: OwnerRequest) => source.name)
      )
      .forMember(
        destination => destination.purchaseDate,
        opts =>
          opts.mapFrom((source: OwnerRequest) => source.purchaseDate)
      );

    mapper
      .createMap(OwnerRequest, Owner)
      .forMember(
        destination => destination.name,
        opts => opts.mapFrom(source => source.name)
      )
      .forMember(
        destination => destination.purchaseDate,
        opts => opts.mapFrom(source => source.purchaseDate)
      );
  }
}
