import { OmitType } from '@nestjs/swagger';
import { TransactionWithRalationIdsModel } from './transaction.model';

export class TransactionDto extends OmitType(TransactionWithRalationIdsModel, [
  'id',
] as const) {}
