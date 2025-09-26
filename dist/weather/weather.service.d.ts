import { ConfigService } from '@nestjs/config';
export declare class WeatherService {
    private readonly configService;
    private cache;
    constructor(configService: ConfigService);
    getRainProbability(lat: number, lon: number): Promise<any>;
}
