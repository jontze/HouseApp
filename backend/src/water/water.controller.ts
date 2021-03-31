import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Water } from '../entity/water.entity';
import { WaterInputDto } from './dto/water-input.dto';
import { WaterService } from './water.service';
@ApiTags('Water')
@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Get()
  @ApiOperation({ summary: 'List water consumption of registered days' })
  async allWater() {
    return this.waterService.waters();
  }

  @Post()
  @ApiOperation({ summary: 'Create new WaterInputDtontry' })
  async createWater(@Body() water: WaterInputDto) {
    return await this.waterService.create(water);
  }
}
