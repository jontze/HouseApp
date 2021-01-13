import { Module } from '@nestjs/common';
import { OilService } from './oil.service';
import { OilController } from './oil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oil } from 'src/entity/oil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oil])],
  providers: [OilService],
  controllers: [OilController],
})
export class OilModule {}
