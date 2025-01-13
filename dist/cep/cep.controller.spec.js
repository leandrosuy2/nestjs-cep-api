"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cep_controller_1 = require("./cep.controller");
const cep_service_1 = require("./cep.service");
const common_1 = require("@nestjs/common");
describe('CepController', () => {
    let controller;
    let service;
    const mockRequest = {
        connection: {
            remoteAddress: '127.0.0.1',
        },
        headers: {},
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [cep_controller_1.CepController],
            providers: [
                {
                    provide: cep_service_1.CepService,
                    useValue: {
                        getAddressByCep: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get(cep_controller_1.CepController);
        service = module.get(cep_service_1.CepService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('getAddressByCep', () => {
        it('should return address data', async () => {
            const mockAddress = {
                cep: '01001-000',
                logradouro: 'Praça da Sé',
                bairro: 'Sé',
                localidade: 'São Paulo',
                uf: 'SP',
            };
            jest.spyOn(service, 'getAddressByCep').mockResolvedValue(mockAddress);
            const result = await controller.getAddressByCep('01001000', mockRequest);
            expect(result).toEqual(mockAddress);
            expect(service.getAddressByCep).toHaveBeenCalledWith('01001000', expect.objectContaining({
                clientIp: expect.any(String),
                timestamp: expect.any(Date),
            }));
        });
        it('should throw NotFoundException for invalid CEP', async () => {
            jest
                .spyOn(service, 'getAddressByCep')
                .mockRejectedValue(new common_1.NotFoundException('CEP inválido'));
            await expect(controller.getAddressByCep('123', mockRequest)).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=cep.controller.spec.js.map