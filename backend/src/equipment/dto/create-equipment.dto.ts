import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { EquipmentStatus } from '../entities/equipment.entity';

export enum EquipmentStatusEnum {
  OPERATIONAL = 'OPERATIONAL',
  MAINTENANCE = 'MAINTENANCE',
}

export class CreateEquipmentDto {
  @ApiProperty({ example: 'Laptop Dell' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ example: 'Dell' })
  @IsString()
  @IsNotEmpty()
  brand!: string;

  @ApiProperty({ example: 'Latitude 5420' })
  @IsString()
  @IsNotEmpty()
  model!: string;

  @ApiProperty({ example: 'DL-001' })
  @IsString()
  @IsNotEmpty()
  serialNumber!: string;

  @ApiPropertyOptional({
    enum: EquipmentStatusEnum,
    default: EquipmentStatusEnum.OPERATIONAL,
    example: EquipmentStatusEnum.OPERATIONAL,
  })
  @IsEnum(EquipmentStatusEnum)
  @IsOptional()
  status?: EquipmentStatus;

  @ApiPropertyOptional({ example: 'Equipo de laboratorio' })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiPropertyOptional({ example: '2026-08-18T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  acquisitionDate?: Date | null;
}
