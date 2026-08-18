export type EquipmentStatus = 'OPERATIONAL' | 'MAINTENANCE';

export interface Equipment {
  id: number;
  name: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  status: EquipmentStatus;
  description: string | null;
  acquisitionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
