import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): object {
    return {
      name : "imerza-collateral-api",
      version : "1.0.0",
      time : new Date(),
      status : "OK",
    };
  }
  getHealth(): object {
    return {
      status : "OK",
    };
  }
}
