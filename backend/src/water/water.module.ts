import { Module } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterController } from './water.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Water } from 'src/entity/water.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Water])],
  providers: [WaterService],
  controllers: [WaterController],
})
export class WaterModule {}
