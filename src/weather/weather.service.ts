import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
    private cache = new Map<string, any>();

    constructor(private readonly configService: ConfigService) {}

    async getRainProbability(lat: number, lon: number): Promise<any> {
        const cacheKey = `${lat},${lon}`;
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (cached.expiry > new Date()) {
                return cached.data;
            }
        }

        // This is where you would call a real weather API
        // For now, we'll just return a mock response
        console.log(`Fetching weather for ${lat}, ${lon} using API key: ${this.configService.get('WEATHER_API_KEY')}`);
        
        const mockData = {
            lat,
            lon,
            probability_of_rain: Math.random(),
            source: 'mock-weather-api',
        };

        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1); // Cache for 1 hour

        this.cache.set(cacheKey, { data: mockData, expiry });

        return mockData;
    }
}