"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CepService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const logger_service_1 = require("../logger/logger.service");
let CepService = class CepService {
    constructor() {
        this.logger = new logger_service_1.CustomLogger();
        this.viaCepBaseUrl = process.env.VIACEP_BASE_URL;
    }
    async getAddressByCep(cep, metadata) {
        const { clientIp, location, timestamp } = metadata;
        this.logger.log(`Request IP: ${clientIp} | Location: ${location ? `${location.city}, ${location.country}` : 'Unknown'} | Time: ${timestamp.toISOString()}`, 'CepService');
        this.logger.log(`Buscando endereço para o CEP: ${cep}`, 'CepService');
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) {
            this.logger.error(`CEP inválido: ${cep}`, null, 'CepService');
            throw new common_1.NotFoundException('CEP inválido');
        }
        try {
            const startTime = Date.now();
            const response = await axios_1.default.get(`${this.viaCepBaseUrl}/${cleanCep}/json/`);
            const endTime = Date.now();
            this.logger.log(`Tempo de resposta da API ViaCEP: ${endTime - startTime}ms`, 'CepService');
            if (response.data.erro) {
                this.logger.error(`CEP não encontrado: ${cep}`, null, 'CepService');
                throw new common_1.NotFoundException('CEP não encontrado');
            }
            this.logger.log(`Endereço encontrado com sucesso para o CEP: ${cep}`, 'CepService');
            return response.data;
        }
        catch (error) {
            this.logger.error(`Erro ao buscar CEP: ${cep}`, error.stack, 'CepService');
            throw new common_1.NotFoundException('CEP não encontrado');
        }
    }
};
exports.CepService = CepService;
exports.CepService = CepService = __decorate([
    (0, common_1.Injectable)()
], CepService);
//# sourceMappingURL=cep.service.js.map