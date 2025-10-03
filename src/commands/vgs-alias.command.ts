import { Command, CommandRunner, Option } from 'nest-commander';
import {
  VGSAliasService,
  VGSAliasCreateData,
  VGSAliasFormat,
  VGSStorageEnum,
} from '../vgs';

interface VGSAliasCommandOptions {
  format?: string;
  storage?: string;
  value?: string;
  alias?: string;
  classifiers?: string[];
}

@Command({
  name: 'vgs-alias',
  description: 'Manage VGS aliases for tokenization',
  arguments: '[action]',
  argsDescription: {
    action: 'Action to perform: create, list, delete, show (default: create)',
  },
})
export class VGSAliasCommand extends CommandRunner {
  constructor(private readonly vgsAliasService: VGSAliasService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: VGSAliasCommandOptions,
  ): Promise<void> {
    const action = passedParams[0] || 'create';

    try {
      switch (action) {
        case 'create':
          await this.createAlias(options);
          break;
        case 'delete':
          await this.deleteAlias(options);
          break;
        case 'show':
          await this.showAlias(options);
          break;
        default:
          console.error(`Unknown action: ${action}`);
          console.log('Available actions: create, list, delete, show');
          process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', (error as Error).message);
      process.exit(1);
    }
  }

  private async createAlias(options?: VGSAliasCommandOptions): Promise<void> {
    const format = options?.format || VGSAliasFormat.UUID;
    const storage = options?.storage || VGSStorageEnum.PERSISTENT;

    console.log('🔄 Creating VGS alias...');

    const aliasData: VGSAliasCreateData = {
      value: options?.value || '',
      format: format as VGSAliasFormat,
      storage: storage as VGSStorageEnum,
      classifiers: options?.classifiers || [],
    };

    try {
      const createdAlias = await this.vgsAliasService.createAlias([aliasData]);
      console.log('✅ VGS alias created successfully!');
      console.log(`Alias: ${JSON.stringify(createdAlias, null, 2)}`);
    } catch (error) {
      throw new Error(`Failed to create alias: ${(error as Error).message}`);
    }
  }

  private async deleteAlias(options?: VGSAliasCommandOptions): Promise<void> {
    const alias = options?.alias || 'fiserv-tokenization';

    if (!alias) {
      throw new Error(
        'Alias name is required for deletion. Use --name option.',
      );
    }

    try {
      await this.vgsAliasService.deleteAlias(alias);
      console.log(`✅ Alias "${alias}" deleted successfully!`);
    } catch (error) {
      throw new Error(
        `Failed to delete alias "${alias}": ${(error as Error).message}`,
      );
    }
  }

  private async showAlias(options?: VGSAliasCommandOptions): Promise<void> {
    const alias = options?.alias || 'fiserv-tokenization';

    if (!alias) {
      throw new Error('Alias name is required. Use --alias option.');
    }

    try {
      const aliasData = await this.vgsAliasService.getAlias(alias);

      console.log(`\n📋 Alias Details:`);
      console.log('==================');
      console.log(JSON.stringify(aliasData, null, 2));
    } catch (error) {
      throw new Error(
        `Failed to fetch alias "${alias}": ${(error as Error).message}`,
      );
    }
  }

  @Option({
    flags: '-v, --value <value>',
    description: 'Alias value',
  })
  parseValue(val: string): string {
    return val;
  }

  @Option({
    flags: '-f, --format <format>',
    description:
      'Alias format: UUID, PFPT, etc. (default: FPE_ALPHANUMERIC_ACC_NUM_T_FOUR)',
  })
  parseFormat(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --storage <storage>',
    description: 'Storage type: PERSISTENT, VOLATILE (default: PERSISTENT)',
  })
  parseStorage(val: string): string {
    return val;
  }

  @Option({
    flags: '-c, --classifiers <classifiers>',
    description: 'Classifiers',
  })
  parseClassifiers(val: string): string {
    return val;
  }

  @Option({
    flags: '-a, --alias <alias>',
    description: 'Alias',
  })
  parseAlias(val: string): string {
    return val;
  }
}
