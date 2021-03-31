import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PowerModule } from './power/power.module';
import { WaterModule } from './water/water.module';
import { OilModule } from './oil/oil.module';

@Module({
  imports: [PowerModule, WaterModule, OilModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
