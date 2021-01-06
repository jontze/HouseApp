import { Module } from '@nestjs/common';
import { OilService } from './oil.service';
import { OilController } from './oil.controller';

@Module({
  providers: [OilService],
  controllers: [OilController],
})
export class OilModule {}
