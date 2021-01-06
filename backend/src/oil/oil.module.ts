import { Module } from '@nestjs/common';
import { OilService } from './oil.service';
import { OilController } from './oil.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OilService],
  controllers: [OilController],
})
export class OilModule {}
