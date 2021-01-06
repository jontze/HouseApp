import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OilService } from './oil.service';

@Controller('oil')
export class OilController {
  constructor(private readonly oilService: OilService) {}

  @Get()
  async allOil() {
    return await this.oilService.oils({
      where: {
        id: {
          gt: 0,
        },
      },
    });
  }

  @Post()
  async createOil(@Body() oil: Prisma.OilCreateInput) {
    return await this.oilService.createOil(oil);
  }
}
