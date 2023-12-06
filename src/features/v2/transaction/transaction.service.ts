import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryV2Service } from '../category/category.service';
import { WalletV2Service } from '../wallet/wallet.service';
import { TransactionDto } from './transaction.dto';
import { TransactionV2Repository } from './transaction.repository';

@Injectable()
export class TransactionV2Service {
  constructor(
    private readonly walletService: WalletV2Service,
    private readonly categoryService: CategoryV2Service,
    private readonly repository: TransactionV2Repository,
  ) {}

  async findById(userId: number, id: number) {
    const transaction = await this.repository.findUnique({
      userId,
      id,
    });

    if (!transaction) {
      throw new NotFoundException("Transaction doesn't exist");
    }

    return transaction;
  }

  async findMany(
    userId: number,
    params: {
      page?: number;
      pageSize?: number;
      walletId?: number;
    },
  ) {
    const { page, pageSize, walletId } = params;
    const where = walletId ? { userId, walletId } : { userId };
    const skip = page && pageSize ? page * pageSize : undefined;
    const take = pageSize || undefined;
    return this.repository.findMany({
      skip,
      take,
      where,
    });
  }

  async create(userId: number, data: TransactionDto) {
    await this.categoryService.findById(userId, data.categoryId);
    await this.walletService.findById(userId, data.walletId);

    const transaction = await this.repository.create({ userId, ...data });
    await this.updateWalletAmount(userId, data.walletId);

    return transaction;
  }

  async update(userId: number, id: number, data: TransactionDto) {
    await this.findById(userId, id);
    await this.categoryService.findById(userId, data.categoryId);
    await this.walletService.findById(userId, data.walletId);

    const transaction = await this.repository.update({
      data,
      where: { userId, id },
    });

    await this.updateWalletAmount(userId, data.walletId);
    return transaction;
  }

  async delete(userId: number, id: number) {
    await this.findById(userId, id);

    const transaction = await this.repository.delete({
      userId,
      id,
    });

    await this.updateWalletAmount(userId, transaction.walletId);
    return transaction;
  }

  private async updateWalletAmount(userId: number, walletId: number) {
    const wallet = await this.walletService.findById(userId, walletId);

    const transactions = await this.repository.findMany({
      where: { userId, walletId },
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
    }, wallet.amount);

    await this.walletService.updateAmount(userId, walletId, amount);
  }
}
