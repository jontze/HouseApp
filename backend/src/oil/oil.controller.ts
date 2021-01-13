import { Body, Controller, Get, Post } from '@nestjs/common';
import { Oil } from 'src/entity/oil.entity';
import { OilService } from './oil.service';

@Controller('oil')
export class OilController {
  constructor(private readonly oilService: OilService) {}

  @Get()
  async allOil() {
    return await this.oilService.oils();
  }

  @Post()
  async createOil(@Body() oil: Oil) {
    return await this.oilService.create(oil);
  }
}
