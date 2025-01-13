import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import { NotFoundException } from '@nestjs/common';
import { Request } from 'express';

describe('CepController', () => {
  let controller: CepController;
  let service: CepService;

  const mockRequest = {
    connection: {
      remoteAddress: '127.0.0.1',
    },
    headers: {},
  } as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepController],
      providers: [
        {
          provide: CepService,
          useValue: {
            getAddressByCep: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CepController>(CepController);
    service = module.get<CepService>(CepService);
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
      expect(service.getAddressByCep).toHaveBeenCalledWith(
        '01001000',
        expect.objectContaining({
          clientIp: expect.any(String),
          timestamp: expect.any(Date),
        }),
      );
    });

    it('should throw NotFoundException for invalid CEP', async () => {
      jest
        .spyOn(service, 'getAddressByCep')
        .mockRejectedValue(new NotFoundException('CEP inválido'));

      await expect(controller.getAddressByCep('123', mockRequest)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});