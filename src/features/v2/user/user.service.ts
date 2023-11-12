import { BadRequestException, Injectable } from '@nestjs/common';
import { UserV2Repository } from './user.repository';
import { UserDto } from './user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserV2Service {
  constructor(private readonly repository: UserV2Repository) {}

  async findById(id: number): Promise<UserModel | null> {
    return this.repository.findUnique({
      id,
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.repository.findUnique({
      email,
    });
  }

  async findMany(): Promise<UserModel[]> {
    return this.repository.findMany({});
  }

  async create(data: UserDto): Promise<UserModel> {
    const userExists = await this.findByEmail(data.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    return this.repository.create(data);
  }

  async update(id: number, data: UserDto): Promise<UserModel> {
    return this.repository.update({
      data,
      where: { id },
    });
  }

  async updateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<UserModel> {
    return this.repository.update({
      data: { refreshToken },
      where: { id },
    });
  }

  async delete(id: number): Promise<UserModel> {
    return this.repository.delete({
      id,
    });
  }
}
