import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import type { EquipmentStatus } from '../entities/equipment.entity';

export enum EquipmentStatusEnum {
  OPERATIONAL = 'OPERATIONAL',
  MAINTENANCE = 'MAINTENANCE',
}

export class UpdateEquipmentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  serialNumber?: string;

  @IsEnum(EquipmentStatusEnum)
  @IsOptional()
  status?: EquipmentStatus;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsDateString()
  @IsOptional()
  acquisitionDate?: Date | null;
}
