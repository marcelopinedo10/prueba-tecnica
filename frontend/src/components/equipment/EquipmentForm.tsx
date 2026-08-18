import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  CreateEquipmentDto,
  Equipment,
  EquipmentStatus,
} from "@/types/equipment";

interface EquipmentFormProps {
  equipment: Equipment | null;
  onSubmit: (data: CreateEquipmentDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const emptyForm: CreateEquipmentDto = {
  name: "",
  type: "",
  brand: "",
  model: "",
  serialNumber: "",
  status: "OPERATIONAL",
  description: "",
  acquisitionDate: "",
};

export function EquipmentForm({
  equipment,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: EquipmentFormProps) {
  const [form, setForm] = useState<CreateEquipmentDto>(emptyForm);

  useEffect(() => {
    if (equipment) {
      setForm({
        name: equipment.name,
        type: equipment.type,
        brand: equipment.brand,
        model: equipment.model,
        serialNumber: equipment.serialNumber,
        status: equipment.status,
        description: equipment.description ?? "",
        acquisitionDate: equipment.acquisitionDate ?? "",
      });
      return;
    }

    setForm(emptyForm);
  }, [equipment]);

  const handleChange = (
    field: keyof CreateEquipmentDto,
    value: string | EquipmentStatus | null,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CreateEquipmentDto = {
      ...form,
      description: form.description?.trim() ? form.description.trim() : null,
      acquisitionDate: form.acquisitionDate ? form.acquisitionDate : null,
      serialNumber: form.serialNumber.trim(),
      name: form.name.trim(),
      type: form.type.trim(),
      brand: form.brand.trim(),
      model: form.model.trim(),
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Laptop Dell"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Input
            id="type"
            value={form.type}
            onChange={(event) => handleChange("type", event.target.value)}
            placeholder="Laptop"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Marca</Label>
          <Input
            id="brand"
            value={form.brand}
            onChange={(event) => handleChange("brand", event.target.value)}
            placeholder="Dell"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Modelo</Label>
          <Input
            id="model"
            value={form.model}
            onChange={(event) => handleChange("model", event.target.value)}
            placeholder="Latitude 5420"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="serialNumber">Número de serie</Label>
          <Input
            id="serialNumber"
            value={form.serialNumber}
            onChange={(event) =>
              handleChange("serialNumber", event.target.value)
            }
            placeholder="DL-001"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select
            value={form.status ?? "OPERATIONAL"}
            onValueChange={(value) =>
              handleChange("status", value as EquipmentStatus)
            }
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Selecciona el estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OPERATIONAL">Operativo</SelectItem>
              <SelectItem value="MAINTENANCE">Mantenimiento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="acquisitionDate">Fecha de adquisición</Label>
          <Input
            id="acquisitionDate"
            type="date"
            value={form.acquisitionDate ?? ""}
            onChange={(event) =>
              handleChange("acquisitionDate", event.target.value)
            }
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={form.description ?? ""}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            placeholder="Comentario o detalle del equipo"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Guardando..."
            : equipment
              ? "Guardar cambios"
              : "Crear equipo"}
        </Button>
      </div>
    </form>
  );
}
