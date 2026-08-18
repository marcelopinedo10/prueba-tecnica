import { useCallback, useEffect, useState } from "react";
import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from "@/api/equipmentApi";
import type {
  CreateEquipmentDto,
  Equipment,
  UpdateEquipmentDto,
} from "@/types/equipment";

export function useEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEquipment();
      setEquipment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading equipment");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshEquipment();
  }, [refreshEquipment]);

  const handleCreate = useCallback(async (data: CreateEquipmentDto) => {
    const created = await createEquipment(data);
    setEquipment((current) => [created, ...current]);
    return created;
  }, []);

  const handleUpdate = useCallback(
    async (id: number, data: UpdateEquipmentDto) => {
      const updated = await updateEquipment(id, data);
      setEquipment((current) =>
        current.map((item) => (item.id === id ? updated : item)),
      );
      return updated;
    },
    [],
  );

  const handleDelete = useCallback(async (id: number) => {
    await deleteEquipment(id);
    setEquipment((current) => current.filter((item) => item.id !== id));
  }, []);

  return {
    equipment,
    loading,
    error,
    refreshEquipment,
    createEquipment: handleCreate,
    updateEquipment: handleUpdate,
    deleteEquipment: handleDelete,
  };
}
