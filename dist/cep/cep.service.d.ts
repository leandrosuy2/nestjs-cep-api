interface RequestMetadata {
    clientIp: string;
    location: any;
    timestamp: Date;
}
export declare class CepService {
    private readonly logger;
    private readonly viaCepBaseUrl;
    getAddressByCep(cep: string, metadata: RequestMetadata): Promise<any>;
}
export {};
