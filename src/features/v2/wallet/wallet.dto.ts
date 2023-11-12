import { OmitType } from '@nestjs/swagger';
import { WalletModel } from './wallet.model';

export class WalletDto extends OmitType(WalletModel, ['id'] as const) {}
