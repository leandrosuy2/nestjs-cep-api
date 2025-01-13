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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CepController = void 0;
const common_1 = require("@nestjs/common");
const cep_service_1 = require("./cep.service");
const request_ip_1 = require("request-ip");
const geoip = require("geoip-lite");
let CepController = class CepController {
    constructor(cepService) {
        this.cepService = cepService;
    }
    async getAddressByCep(cep, request) {
        const clientIp = (0, request_ip_1.getClientIp)(request);
        const geo = geoip.lookup(clientIp);
        return this.cepService.getAddressByCep(cep, {
            clientIp,
            location: geo,
            timestamp: new Date(),
        });
    }
};
exports.CepController = CepController;
__decorate([
    (0, common_1.Get)(':cep'),
    __param(0, (0, common_1.Param)('cep')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CepController.prototype, "getAddressByCep", null);
exports.CepController = CepController = __decorate([
    (0, common_1.Controller)('cep'),
    __metadata("design:paramtypes", [cep_service_1.CepService])
], CepController);
//# sourceMappingURL=cep.controller.js.map