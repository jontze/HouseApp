import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Water, Prisma } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WaterService {
  constructor(private readonly prisma: PrismaService) {}

  async water(
    waterWhereUniqueInput: Prisma.WaterWhereUniqueInput,
  ): Promise<Water | null> {
    return this.prisma.water.findUnique({
      where: waterWhereUniqueInput,
    });
  }

  async waters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WaterWhereUniqueInput;
    where: Prisma.WaterWhereInput;
    orderBy?: Prisma.WaterOrderByInput;
  }): Promise<Water[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.water.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async countWater(params: Prisma.FindManyWaterArgs): Promise<number> {
    return await this.prisma.water.count(params);
  }

  async updateWater(params: {
    where: Prisma.WaterWhereUniqueInput;
    data: Prisma.WaterUpdateInput;
  }): Promise<Water> {
    const { where, data } = params;
    return this.prisma.water.update({
      data,
      where,
    });
  }

  async createWater(data: Prisma.WaterCreateInput): Promise<Water> {
    const newWater = await this.prisma.water.create({
      data,
    });
    if (!newWater) {
      throw new HttpException('Water foundation failed.', HttpStatus.FORBIDDEN);
    } else {
      return newWater;
    }
  }
}
