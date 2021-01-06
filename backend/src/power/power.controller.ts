import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    // TODO: validate
    const validatedPower = power;
    validatedPower.date = new Date();
    validatedPower.kwh = 10000;
    return await this.powerService.createPower(power);
  }
}
