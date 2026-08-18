import type {
  CreateEquipmentDto,
  Equipment,
  UpdateEquipmentDto,
} from "@/types/equipment";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return (await response.json()) as T;
}

export async function getEquipment(): Promise<Equipment[]> {
  const response = await fetch(`${API_BASE_URL}/equipment`);
  return handleResponse<Equipment[]>(response);
}

export async function createEquipment(
  data: CreateEquipmentDto,
): Promise<Equipment> {
  const response = await fetch(`${API_BASE_URL}/equipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Equipment>(response);
}

export async function updateEquipment(
  id: number,
  data: UpdateEquipmentDto,
): Promise<Equipment> {
  const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Equipment>(response);
}

export async function deleteEquipment(id: number): Promise<Equipment> {
  const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
    method: "DELETE",
  });

  return handleResponse<Equipment>(response);
}
