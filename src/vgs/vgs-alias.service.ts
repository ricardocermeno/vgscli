import { Injectable } from '@nestjs/common';
import { Aliases, config as VGSConfig } from '@vgs/api-client';
import { AppConfigService } from '../config/app.config';

export enum VGSStorageEnum {
  PERSISTENT = 'PERSISTENT',
  VOLATILE = 'VOLATILE',
}

export enum VGSAliasFormat {
  FPE_ACC_NUM_T_FOUR = 'FPE_ACC_NUM_T_FOUR',
  FPE_ALPHANUMERIC_ACC_NUM_T_FOUR = 'FPE_ALPHANUMERIC_ACC_NUM_T_FOUR',
  FPE_SIX_T_FOUR = 'FPE_SIX_T_FOUR',
  FPE_SSN_T_FOUR = 'FPE_SSN_T_FOUR',
  FPE_T_FOUR = 'FPE_T_FOUR',
  NUM_LENGTH_PRESERVING = 'NUM_LENGTH_PRESERVING',
  PFPT = 'PFPT',
  RAW_UUID = 'RAW_UUID',
  UUID = 'UUID',
}

export interface VGSAliasCreateData {
  value: string;
  format: VGSAliasFormat;
  storage?: VGSStorageEnum;
  classifiers?: string[];
}

export interface VGSAlias {
  format?: string;
  storage?: string;
  created_at?: string;

  classifiers?: string[];

  aliases: string[];
}

@Injectable()
export class VGSAliasService {
  private vgs: Aliases;

  constructor(private readonly appConfigService: AppConfigService) {
    this.initializeVGS();
  }

  private initializeVGS(): void {
    const { username, password, host } = this.appConfigService.vgs;

    this.vgs = new Aliases(VGSConfig(username, password, host));
  }

  /**
   * Create a new VGS alias using the redact method
   */
  async createAlias(aliasData: VGSAliasCreateData[]): Promise<VGSAlias> {
    console.log('🔄 Creating VGS alias...');

    try {
      // Use the redact method to create an alias
      const result = (await this.vgs.redact(aliasData)) as VGSAlias;

      console.log('✅ VGS alias created successfully!');

      return result;
    } catch (error) {
      throw new Error(`Failed to create alias: ${(error as Error).message}`);
    }
  }

  /**
   * Get a specific VGS alias by name
   */
  async getAlias(alias: string): Promise<VGSAlias> {
    console.log(`🔍 Fetching details for alias: ${alias}`);

    try {
      // Access the get method through type assertion
      const result = (await this.vgs.reveal(alias)) as VGSAlias;

      console.log(`📋 Alias "${alias}" details retrieved successfully`);
      return result;
    } catch (error) {
      throw new Error(
        `Failed to fetch alias "${alias}": ${(error as Error).message}`,
      );
    }
  }

  /**
   * Delete a VGS alias by name
   */
  async deleteAlias(alias: string): Promise<void> {
    console.log(`🗑️  Deleting VGS alias: ${alias}`);

    try {
      // Access the delete method through type assertion
      await this.vgs.delete(alias);
      console.log(`✅ Alias "${alias}" deleted successfully!`);
    } catch (error) {
      throw new Error(
        `Failed to delete alias "${alias}": ${(error as Error).message}`,
      );
    }
  }

  /**
   * Update a VGS alias
   */
  async updateAlias(
    name: string,
    updateData: Pick<VGSAliasCreateData, 'classifiers'>,
  ): Promise<VGSAlias> {
    console.log(`🔄 Updating VGS alias: ${name}`);

    try {
      // Access the update method through type assertion
      const updatedAlias = (await this.vgs.update(
        name,
        updateData,
      )) as VGSAlias;

      console.log(`✅ Alias "${name}" updated successfully!`);
      return updatedAlias;
    } catch (error) {
      throw new Error(
        `Failed to update alias "${name}": ${(error as Error).message}`,
      );
    }
  }
}
