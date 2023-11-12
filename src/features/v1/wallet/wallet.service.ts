import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WalletDto } from './wallet.dto';
import { WalletModel } from './wallet.model';
import { WalletV1Repository } from './wallet.repository';

@Injectable()
export class WalletV1Service {
  constructor(private readonly repository: WalletV1Repository) {}

  async getTotal() {
    const total = await this.repository.aggregateSum({ amount: true });
    return total._sum;
  }

  async findById(id: number) {
    const wallet = await this.repository.findUnique({
      id,
    });

    if (!wallet) {
      throw new NotFoundException("Wallet doesn't exist");
    }

    return wallet;
  }

  async findByName(name: string) {
    return this.repository.findFirst({
      where: { name },
    });
  }

  async findByNameExcludeThis(id: number, name: string) {
    return this.repository.findFirst({
      where: {
        name,
        NOT: { id },
      },
    });
  }

  async findMany() {
    return this.repository.findMany({});
  }

  async create(data: WalletDto) {
    const wallet = await this.findByName(data.name);
    if (wallet) {
      throw new ConflictException('Wallet already exists');
    }

    return this.repository.create(data);
  }

  async update(id: number, data: WalletDto) {
    const wallet = await this.findByNameExcludeThis(id, data.name);
    if (wallet) {
      throw new ConflictException('Wallet already exists');
    }

    return this.repository.update({
      data,
      where: { id },
    });
  }

  async updateAmount(id: number, amount: number) {
    return this.repository.update({
      data: { amount },
      where: { id },
    });
  }

  async delete(id: number): Promise<WalletModel> {
    const wallet = await this.repository.findUnique({
      id,
    });

    if (!wallet) {
      throw new NotFoundException("Wallet doesn't exist");
    }

    return this.repository.delete({
      id,
    });
  }
}
