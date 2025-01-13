import { CepService } from './cep.service';
import { Request } from 'express';
export declare class CepController {
    private readonly cepService;
    constructor(cepService: CepService);
    getAddressByCep(cep: string, request: Request): Promise<any>;
}
