import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import type { EquipmentStatus } from '../entities/equipment.entity';

export enum EquipmentStatusEnum {
  OPERATIONAL = 'OPERATIONAL',
  MAINTENANCE = 'MAINTENANCE',
}

export class UpdateEquipmentDto {
  @ApiPropertyOptional({ example: 'Laptop Dell' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Laptop' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ example: 'Dell' })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({ example: 'Latitude 5420' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ example: 'DL-001' })
  @IsString()
  @IsOptional()
  serialNumber?: string;

  @ApiPropertyOptional({
    enum: EquipmentStatusEnum,
    example: EquipmentStatusEnum.MAINTENANCE,
  })
  @IsEnum(EquipmentStatusEnum)
  @IsOptional()
  status?: EquipmentStatus;

  @ApiPropertyOptional({ example: 'En mantenimiento' })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiPropertyOptional({ example: '2026-08-18T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  acquisitionDate?: Date | null;
}
