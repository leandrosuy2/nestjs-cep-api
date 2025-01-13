import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from './cep.service';
import { NotFoundException } from '@nestjs/common';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CepService', () => {
  let service: CepService;

  const mockMetadata = {
    clientIp: '127.0.0.1',
    location: {
      city: 'São Paulo',
      country: 'BR',
    },
    timestamp: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepService],
    }).compile();

    service = module.get<CepService>(CepService);
    process.env.VIACEP_BASE_URL = 'https://viacep.com.br/ws';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAddressByCep', () => {
    it('should return address data for valid CEP', async () => {
      const mockAddress = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockAddress });

      const result = await service.getAddressByCep('01001000', mockMetadata);
      expect(result).toEqual(mockAddress);
    });

    it('should throw NotFoundException for invalid CEP format', async () => {
      await expect(service.getAddressByCep('123', mockMetadata)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException for non-existent CEP', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { erro: true } });

      await expect(service.getAddressByCep('00000000', mockMetadata)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.getAddressByCep('01001000', mockMetadata)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should clean CEP format before making request', async () => {
      const mockAddress = { cep: '01001-000' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockAddress });

      await service.getAddressByCep('01001-000', mockMetadata);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://viacep.com.br/ws/01001000/json/',
      );
    });
  });
});