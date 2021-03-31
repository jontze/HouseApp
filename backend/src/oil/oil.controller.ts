import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Oil } from '../entity/oil.entity';
import { OilInputDto } from './dto/oil-input.dto';
import { OilService } from './oil.service';

@ApiTags('Oil')
@Controller('oil')
export class OilController {
  constructor(private readonly oilService: OilService) {}

  @Get()
  @ApiOperation({ summary: 'List all oil levels of registered days' })
  async allOil(): Promise<Oil[]> {
    return await this.oilService.oils();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new entry' })
  async createOil(@Body() oil: OilInputDto): Promise<Oil> {
    return await this.oilService.create({ date: oil.date, filled: oil.filled });
  }
}
