import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CustomLogger } from '../logger/logger.service';

interface RequestMetadata {
  clientIp: string;
  location: any;
  timestamp: Date;
}

@Injectable()
export class CepService {
  private readonly logger = new CustomLogger();
  private readonly viaCepBaseUrl = process.env.VIACEP_BASE_URL;

  async getAddressByCep(cep: string, metadata: RequestMetadata) {
    const { clientIp, location, timestamp } = metadata;
    
    this.logger.log(
      `Request IP: ${clientIp} | Location: ${location ? `${location.city}, ${location.country}` : 'Unknown'} | Time: ${timestamp.toISOString()}`,
      'CepService'
    );
    
    this.logger.log(`Buscando endereço para o CEP: ${cep}`, 'CepService');
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      this.logger.error(`CEP inválido: ${cep}`, null, 'CepService');
      throw new NotFoundException('CEP inválido');
    }

    try {
      const startTime = Date.now();
      const response = await axios.get(`${this.viaCepBaseUrl}/${cleanCep}/json/`);
      const endTime = Date.now();
      
      this.logger.log(
        `Tempo de resposta da API ViaCEP: ${endTime - startTime}ms`,
        'CepService',
      );

      if (response.data.erro) {
        this.logger.error(`CEP não encontrado: ${cep}`, null, 'CepService');
        throw new NotFoundException('CEP não encontrado');
      }

      this.logger.log(
        `Endereço encontrado com sucesso para o CEP: ${cep}`,
        'CepService',
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        `Erro ao buscar CEP: ${cep}`,
        error.stack,
        'CepService',
      );
      throw new NotFoundException('CEP não encontrado');
    }
  }
}