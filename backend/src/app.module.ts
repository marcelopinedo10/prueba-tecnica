import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, EquipmentModule],
})
export class AppModule {}
