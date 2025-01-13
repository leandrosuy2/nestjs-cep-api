import { Controller, Get, Param, Req } from '@nestjs/common';
import { CepService } from './cep.service';
import { Request } from 'express';
import { getClientIp } from 'request-ip';
import * as geoip from 'geoip-lite';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  async getAddressByCep(@Param('cep') cep: string, @Req() request: Request) {
    const clientIp = getClientIp(request);
    const geo = geoip.lookup(clientIp);
    
    return this.cepService.getAddressByCep(cep, {
      clientIp,
      location: geo,
      timestamp: new Date(),
    });
  }
}