import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Oil, Prisma } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OilService {
  constructor(private readonly prisma: PrismaService) {}

  async oil(
    oilWhereUniqueInput: Prisma.OilWhereUniqueInput,
  ): Promise<Oil | null> {
    return this.prisma.oil.findUnique({
      where: oilWhereUniqueInput,
    });
  }

  async oils(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OilWhereUniqueInput;
    where: Prisma.OilWhereInput;
    orderBy?: Prisma.OilOrderByInput;
  }): Promise<Oil[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.oil.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async countOil(params: Prisma.FindManyOilArgs): Promise<number> {
    return await this.prisma.oil.count(params);
  }

  async updateOil(params: {
    where: Prisma.OilWhereUniqueInput;
    data: Prisma.OilUpdateInput;
  }): Promise<Oil> {
    const { where, data } = params;
    return this.prisma.oil.update({
      data,
      where,
    });
  }

  async createOil(data: Prisma.OilCreateInput): Promise<Oil> {
    const newOil = await this.prisma.oil.create({
      data,
    });
    if (!newOil) {
      throw new HttpException('Oil foundation failed.', HttpStatus.FORBIDDEN);
    } else {
      return newOil;
    }
  }
}
