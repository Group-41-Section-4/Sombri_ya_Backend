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
var UserEntity_1 = require("./UserEntity");
var OrganizationEntity_1 = require("./OrganizationEntity");
var UserToOrganizationEntity = /** @class */ (function () {
    function UserToOrganizationEntity() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], UserToOrganizationEntity.prototype, "id", void 0);
    __decorate([
        src_1.Column({
            type: "enum",
            enum: [
                "owner",
                "editor",
                "viewer"
            ]
        }),
        __metadata("design:type", String)
    ], UserToOrganizationEntity.prototype, "role", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return UserEntity_1.UserEntity; }, function (user) { return user.organizations; }),
        __metadata("design:type", UserEntity_1.UserEntity)
    ], UserToOrganizationEntity.prototype, "user", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return OrganizationEntity_1.OrganizationEntity; }, function (organization) { return organization.users; }),
        __metadata("design:type", OrganizationEntity_1.OrganizationEntity)
    ], UserToOrganizationEntity.prototype, "organization", void 0);
    UserToOrganizationEntity = __decorate([
        src_1.Entity("user_organization")
    ], UserToOrganizationEntity);
    return UserToOrganizationEntity;
}());
exports.UserToOrganizationEntity = UserToOrganizationEntity;
//# sourceMappingURL=UserToOrganizationEntity.js.map