import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Power])],
  providers: [PowerService],
  controllers: [PowerController],
})
export class PowerModule {}
