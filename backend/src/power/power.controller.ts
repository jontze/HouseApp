import { Controller, Get, Post } from '@nestjs/common';
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
  async createPower() {
    // save power to table
  }
}
