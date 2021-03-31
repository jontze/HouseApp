import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Power } from '../entity/power.entity';
import { PowerInputDto } from './dto/power-input.dto';
import { PowerService } from './power.service';

@ApiTags('Power')
@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get()
  @ApiOperation({ summary: 'List power consumption of registered days' })
  async allPower(): Promise<Power[]> {
    return await this.powerService.powers();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new entry' })
  async create(@Body() power: PowerInputDto) {
    return await this.powerService.create(power);
  }
}
