import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryV1Service } from '../category/category.service';
import { WalletV1Service } from '../wallet/wallet.service';
import { TransactionDto } from './transaction.dto';
import { TransactionV1Repository } from './transaction.repository';

@Injectable()
export class TransactionV1Service {
  constructor(
    private readonly walletV1Service: WalletV1Service,
    private readonly categoryService: CategoryV1Service,
    private readonly repository: TransactionV1Repository,
  ) {}

  async findById(id: number) {
    const transaction = await this.repository.findUnique({
      id,
    });

    if (!transaction) {
      throw new NotFoundException("Transaction doesn't exist");
    }

    return transaction;
  }

  async findMany(params: {
    page?: number;
    pageSize?: number;
    walletId?: number;
  }) {
    const { page, pageSize, walletId } = params;
    const where = walletId ? { walletId } : {};
    return this.repository.findMany({
      skip: page * pageSize,
      take: pageSize,
      where,
    });
  }

  async create(data: TransactionDto) {
    await this.categoryService.findById(data.categoryId);
    await this.walletV1Service.findById(data.walletId);

    const transaction = await this.repository.create(data);
    await this.updateWalletAmount(data.walletId);

    return transaction;
  }

  async update(id: number, data: TransactionDto) {
    await this.categoryService.findById(data.categoryId);
    await this.walletV1Service.findById(data.walletId);

    const transaction = await this.repository.update({
      data,
      where: { id },
    });

    await this.updateWalletAmount(data.walletId);
    return transaction;
  }

  async delete(id: number) {
    await this.findById(id);

    const transaction = await this.repository.delete({
      id,
    });

    await this.updateWalletAmount(transaction.walletId);
    return transaction;
  }

  private async updateWalletAmount(walletId: number) {
    const transactions = await this.repository.findMany({
      where: { walletId },
    });

    const amount = transactions.reduce((total, transaction) => {
      switch (transaction.category.type) {
        case 'gasto':
          return total - transaction.amount;
        case 'ingreso':
          return total + transaction.amount;
        default:
          return total;
      }
    }, 0);

    await this.walletV1Service.updateAmount(walletId, amount);
  }
}
