import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PowerModule } from './power/power.module';
import { WaterModule } from './water/water.module';
import { OilModule } from './oil/oil.module';

@Module({
  imports: [PrismaModule, PowerModule, WaterModule, OilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
