import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EquipmentEmptyStateProps {
  onCreate: () => void;
}

export function EquipmentEmptyState({ onCreate }: EquipmentEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center shadow-sm">
      <PackageSearch className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No hay equipos registrados</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Añade tu primer equipo para comenzar a gestionar el inventario de
        computación.
      </p>
      <Button className="mt-6" onClick={onCreate}>
        Nuevo equipo
      </Button>
    </div>
  );
}
