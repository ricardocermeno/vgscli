#!/usr/bin/env node
import { CommandFactory } from 'nest-commander';
import { ZCliModule } from './cli.module';

async function bootstrap() {
  await CommandFactory.run(ZCliModule, {
    logger: ['warn', 'error'],
  });
}
bootstrap().catch(console.error);
