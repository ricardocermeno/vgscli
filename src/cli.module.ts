import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VGSAliasCommand } from './commands/vgs-alias.command';
import { VGSModule } from './vgs';
import { envValidationSchema } from './config/env.validation';
import { AppConfigService } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    VGSModule,
  ],
  providers: [VGSAliasCommand, AppConfigService],
  exports: [AppConfigService],
})
export class ZCliModule {}
