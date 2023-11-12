import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WalletDto } from './wallet.dto';
import { WalletModel } from './wallet.model';
import { WalletV2Repository } from './wallet.repository';

@Injectable()
export class WalletV2Service {
  constructor(private readonly repository: WalletV2Repository) {}

  async getTotal(userId: number) {
    const total = await this.repository.aggregateSum({
      _sum: { amount: true },
      where: { userId },
    });
    return total._sum;
  }

  async findById(userId: number, id: number) {
    const wallet = await this.repository.findUnique({
      userId,
      id,
    });

    if (!wallet) {
      throw new NotFoundException("Wallet doesn't exist");
    }

    return wallet;
  }

  async findByName(userId: number, name: string) {
    return this.repository.findFirst({
      where: {
        userId,
        name,
      },
    });
  }

  async findByNameExcludeThis(userId: number, id: number, name: string) {
    return this.repository.findFirst({
      where: {
        userId,
        name,
        NOT: { id, userId },
      },
    });
  }

  async findMany(userId: number) {
    return this.repository.findMany({ where: { userId } });
  }

  async create(userId: number, data: WalletDto) {
    const wallet = await this.findByName(userId, data.name);
    if (wallet) {
      throw new ConflictException('Wallet already exists');
    }

    return this.repository.create({ userId, ...data });
  }

  async update(userId: number, id: number, data: WalletDto) {
    await this.findById(userId, id);
    const wallet = await this.findByNameExcludeThis(userId, id, data.name);
    if (wallet) {
      throw new ConflictException('Wallet with that name already exists');
    }

    return this.repository.update({
      data,
      where: { userId, id },
    });
  }

  async updateAmount(userId: number, id: number, amount: number) {
    return this.repository.update({
      data: { amount },
      where: { userId, id },
    });
  }

  async delete(userId: number, id: number): Promise<WalletModel> {
    const wallet = await this.repository.findUnique({
      userId,
      id,
    });

    if (!wallet) {
      throw new NotFoundException("Wallet doesn't exist");
    }

    return this.repository.delete({
      userId,
      id,
    });
  }
}
