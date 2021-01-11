import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import { PowerService } from './power.service';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get()
  async allPower() {
    return await this.powerService.powers({
      where: {
        id: {
          gt: 0,
        },
      },
    });
  }

  @Post()
  async createPower(@Body() power: Prisma.PowerCreateInput) {
    return await this.powerService.createPower(power);
  }
}
