"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesSchema = exports.Files = exports.FileSchema = exports.File = exports.FileDerivativeSchema = exports.FileDerivative = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FileDerivative = class FileDerivative {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FileDerivative.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FileDerivative.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FileDerivative.prototype, "role", void 0);
FileDerivative = __decorate([
    (0, mongoose_1.Schema)({
        _id: false,
    })
], FileDerivative);
exports.FileDerivative = FileDerivative;
exports.FileDerivativeSchema = mongoose_1.SchemaFactory.createForClass(FileDerivative);
let File = class File {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], File.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], File.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.FileDerivativeSchema] }),
    __metadata("design:type", mongoose_2.Types.DocumentArray)
], File.prototype, "derivatives", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], File.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Boolean }),
    __metadata("design:type", Boolean)
], File.prototype, "deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Boolean }),
    __metadata("design:type", Boolean)
], File.prototype, "processing", void 0);
File = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], File);
exports.File = File;
exports.FileSchema = mongoose_1.SchemaFactory.createForClass(File);
let Files = class Files {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Files.prototype, "project", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Files.prototype, "prefix", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.FileSchema] }),
    __metadata("design:type", mongoose_2.Types.DocumentArray)
], Files.prototype, "files", void 0);
Files = __decorate([
    (0, mongoose_1.Schema)()
], Files);
exports.Files = Files;
exports.FilesSchema = mongoose_1.SchemaFactory.createForClass(Files);
//# sourceMappingURL=files.schema.js.map