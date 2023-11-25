import { Model, Types } from 'mongoose';
import { CollateralDocument } from './schemas/collateral.schema';
export declare class AppController {
    private collateralModel;
    constructor(collateralModel: Model<CollateralDocument>);
    list({ project }: {
        project: any;
    }): Promise<any>;
    validate({ project, name }: {
        project: any;
        name: any;
    }): Promise<{
        valid: boolean;
    }>;
    getGallery({ project, id }: {
        project: any;
        id: any;
    }): Promise<Types.Subdocument<Types.ObjectId> & import("./schemas/collateral.schema").Gallery>;
    delete({ project, id }: {
        project: any;
        id: any;
    }): Promise<{
        status: string;
    }>;
    removeFromGalleries({ project, id }: {
        project: any;
        id: any;
    }): Promise<{
        status: string;
    }>;
    updateGalleries({ project, galleries }: {
        project: any;
        galleries: any;
    }): Promise<{
        status: string;
    }>;
    update({ project, id, gallery }: {
        project: any;
        id: any;
        gallery: any;
    }): Promise<{
        status: string;
    }>;
    create({ project, name }: {
        project: any;
        name: any;
    }): Promise<{
        _id: Types.ObjectId;
        name: any;
        items: any[];
        deleted: boolean;
    }>;
}
