"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UmbrellasModule = void 0;
const common_1 = require("@nestjs/common");
const umbrellas_controller_1 = require("./umbrellas.controller");
const umbrellas_service_1 = require("./umbrellas.service");
let UmbrellasModule = class UmbrellasModule {
};
exports.UmbrellasModule = UmbrellasModule;
exports.UmbrellasModule = UmbrellasModule = __decorate([
    (0, common_1.Module)({
        controllers: [umbrellas_controller_1.UmbrellasController],
        providers: [umbrellas_service_1.UmbrellasService]
    })
], UmbrellasModule);
//# sourceMappingURL=umbrellas.module.js.map