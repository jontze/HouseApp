import { Body, Controller, Get, Post } from '@nestjs/common';
import { Power } from '../entity/power.entity';
import { PowerService } from './power.service';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get()
  async allPower() {
    return await this.powerService.powers();
  }

  @Post()
  async create(@Body() power: Power) {
    return await this.powerService.create(power);
  }
}
