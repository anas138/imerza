/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Types } from "mongoose";
export type FilesDocument = Files & Document;
export type FileDocument = File & Document;
export declare class FileDerivative {
    size: `${number}x${number}`;
    fileName: string;
    role: string;
}
export declare const FileDerivativeSchema: import("mongoose").Schema<FileDerivative, import("mongoose").Model<FileDerivative, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FileDerivative>;
export declare class File {
    name: string;
    source: string;
    derivatives: Types.DocumentArray<FileDerivative>;
    key: string;
    deleted: boolean;
    processing: boolean;
}
export declare const FileSchema: import("mongoose").Schema<File, import("mongoose").Model<File, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, File>;
export declare class Files {
    project: Types.ObjectId;
    prefix: string;
    files: Types.DocumentArray<File>;
}
export declare const FilesSchema: import("mongoose").Schema<Files, import("mongoose").Model<Files, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Files>;
