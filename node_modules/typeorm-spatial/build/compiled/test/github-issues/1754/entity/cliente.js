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
var src_1 = require("../../../../src");
var tipo_cliente_1 = require("./tipo-cliente");
var Cliente = /** @class */ (function () {
    function Cliente() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Cliente.prototype, "id", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", String)
    ], Cliente.prototype, "nome", void 0);
    __decorate([
        src_1.ManyToOne(function () { return tipo_cliente_1.TipoCliente; }, function (tc) { return tc.clientes; }),
        src_1.JoinColumn({ name: "tipoCliente" }),
        __metadata("design:type", tipo_cliente_1.TipoCliente)
    ], Cliente.prototype, "tipo", void 0);
    Cliente = __decorate([
        src_1.Entity()
    ], Cliente);
    return Cliente;
}());
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map