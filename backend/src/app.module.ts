import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PowerModule } from './power/power.module';
import { WaterModule } from './water/water.module';
import { OilModule } from './oil/oil.module';

@Module({
  imports: [PrismaModule, PowerModule, WaterModule, OilModule],
})
export class AppModule {}
