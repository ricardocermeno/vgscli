import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VGSAliasService } from './vgs-alias.service';
import { AppConfigService } from '../config/app.config';

@Module({
  imports: [ConfigModule],
  providers: [VGSAliasService, AppConfigService],
  exports: [VGSAliasService, AppConfigService],
})
export class VGSModule {}
