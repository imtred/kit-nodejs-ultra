import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getServerStatus(): any {
    return {
      status: 'alive'
    };
  }
}
