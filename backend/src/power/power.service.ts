import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Power, Prisma } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PowerService {
  constructor(private readonly prisma: PrismaService) {}

  async power(
    powerWhereUniqueInput: Prisma.PowerWhereUniqueInput,
  ): Promise<Power | null> {
    return this.prisma.power.findUnique({
      where: powerWhereUniqueInput,
    });
  }

  async powers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PowerWhereUniqueInput;
    where: Prisma.PowerWhereInput;
    orderBy?: Prisma.PowerOrderByInput;
  }): Promise<Power[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.power.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async countPower(params: Prisma.FindManyPowerArgs): Promise<number> {
    return await this.prisma.power.count(params);
  }

  async updatePower(params: {
    where: Prisma.PowerWhereUniqueInput;
    data: Prisma.PowerUpdateInput;
  }): Promise<Power> {
    const { where, data } = params;
    return this.prisma.power.update({
      data,
      where,
    });
  }

  async createPower(data: Prisma.PowerCreateInput): Promise<Power> {
    const newPower = await this.prisma.power.create({
      data,
    });
    if (!newPower) {
      throw new HttpException('Power foundation failed.', HttpStatus.FORBIDDEN);
    } else {
      return newPower;
    }
  }
}
