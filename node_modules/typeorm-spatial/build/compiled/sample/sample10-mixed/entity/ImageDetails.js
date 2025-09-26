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
var index_1 = require("../../../src/index");
var Image_1 = require("./Image");
var ImageDetails = /** @class */ (function () {
    function ImageDetails() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ImageDetails.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], ImageDetails.prototype, "meta", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], ImageDetails.prototype, "comment", void 0);
    __decorate([
        index_1.OneToOne(function (type) { return Image_1.Image; }, function (image) { return image.details; }),
        __metadata("design:type", Image_1.Image)
    ], ImageDetails.prototype, "image", void 0);
    ImageDetails = __decorate([
        index_1.Entity("sample10_image_details")
    ], ImageDetails);
    return ImageDetails;
}());
exports.ImageDetails = ImageDetails;
//# sourceMappingURL=ImageDetails.js.map