import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface VGSConfig {
  username: string;
  password: string;
  host?: string;
}

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get vgs(): VGSConfig {
    return {
      username: this.configService.get<string>('VGS_USERNAME', ''),
      password: this.configService.get<string>('VGS_PASSWORD', ''),
      host: this.configService.get<string>('VGS_HOST'),
    };
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}
