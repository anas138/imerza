import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Collateral, CollateralDocument } from './schemas/collateral.schema';
import { Observable } from 'rxjs';
export declare class AppService {
    private collateralModel;
    private filesService;
    constructor(collateralModel: Model<CollateralDocument>, filesService: ClientProxy);
    getHello(): string;
    createCollateralDocument(doc: Collateral): Observable<void>;
}
