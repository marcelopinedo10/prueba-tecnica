import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Equipment, EquipmentStatus } from './entities/equipment.entity';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateEquipmentDto } from './dto/create-equipment.dto';
import type { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Equipment[]> {
    return this.prisma.equipment.findMany({
      orderBy: { createdAt: 'desc' },
    }) as Promise<Equipment[]>;
  }

  async findOne(id: number): Promise<Equipment> {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new NotFoundException(`Equipment with id ${id} not found`);
    }

    return equipment as Equipment;
  }

  async create(data: CreateEquipmentDto): Promise<Equipment> {
    const serialNumber = data.serialNumber?.trim();

    if (!serialNumber) {
      throw new BadRequestException('serialNumber is required');
    }

    const existing = await this.prisma.equipment.findUnique({
      where: { serialNumber },
    });

    if (existing) {
      throw new ConflictException(
        'A equipment with this serial number already exists',
      );
    }

    const equipment = await this.prisma.equipment.create({
      data: {
        name: data.name,
        type: data.type,
        brand: data.brand,
        model: data.model,
        serialNumber,
        status: (data.status ?? 'OPERATIONAL') as EquipmentStatus,
        description: data.description ?? null,
        acquisitionDate: data.acquisitionDate
          ? new Date(data.acquisitionDate)
          : null,
      },
    });

    return equipment as Equipment;
  }

  async update(id: number, data: UpdateEquipmentDto): Promise<Equipment> {
    const existing = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Equipment with id ${id} not found`);
    }

    if (data.serialNumber && data.serialNumber !== existing.serialNumber) {
      const serialExists = await this.prisma.equipment.findUnique({
        where: { serialNumber: data.serialNumber },
      });

      if (serialExists) {
        throw new ConflictException(
          'A equipment with this serial number already exists',
        );
      }
    }

    const equipment = await this.prisma.equipment.update({
      where: { id },
      data: {
        ...data,
        serialNumber: data.serialNumber?.trim() ?? existing.serialNumber,
        description: data.description ?? existing.description,
        acquisitionDate:
          data.acquisitionDate !== undefined
            ? data.acquisitionDate
              ? new Date(data.acquisitionDate)
              : null
            : existing.acquisitionDate,
      },
    });

    return equipment as Equipment;
  }

  async remove(id: number): Promise<Equipment> {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new NotFoundException(`Equipment with id ${id} not found`);
    }

    const deletedEquipment = await this.prisma.equipment.delete({
      where: { id },
    });

    return deletedEquipment as Equipment;
  }
}
