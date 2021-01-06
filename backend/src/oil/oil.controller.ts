import { Controller, Get, Post } from '@nestjs/common';
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
  async createOil() {
    // save params in Oil-Table
  }
}
