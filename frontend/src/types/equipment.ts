export type EquipmentStatus = "OPERATIONAL" | "MAINTENANCE";

export interface Equipment {
  id: number;
  name: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  status: EquipmentStatus;
  description: string | null;
  acquisitionDate: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEquipmentDto {
  name: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  status?: EquipmentStatus;
  description?: string | null;
  acquisitionDate?: string | null;
}

export type UpdateEquipmentDto = Partial<CreateEquipmentDto>;
