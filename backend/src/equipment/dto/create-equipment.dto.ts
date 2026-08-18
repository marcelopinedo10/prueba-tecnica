import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import type { EquipmentStatus } from '../entities/equipment.entity';

export enum EquipmentStatusEnum {
  OPERATIONAL = 'OPERATIONAL',
  MAINTENANCE = 'MAINTENANCE',
}

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @IsString()
  @IsNotEmpty()
  serialNumber!: string;

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
