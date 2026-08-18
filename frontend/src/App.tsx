import { useMemo, useState } from "react";
import { AlertCircle, Plus, RefreshCw, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EquipmentEmptyState } from "@/components/equipment/EquipmentEmptyState";
import { EquipmentForm } from "@/components/equipment/EquipmentForm";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { useEquipment } from "@/hooks/useEquipment";
import type { CreateEquipmentDto, Equipment } from "@/types/equipment";

function App() {
  const {
    equipment,
    loading,
    error,
    refreshEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment,
  } = useEquipment();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(
    null,
  );

  const totalEquipment = useMemo(() => equipment.length, [equipment]);

  const handleCreate = async (data: CreateEquipmentDto) => {
    try {
      setIsSubmitting(true);
      await createEquipment(data);
      setIsFormOpen(false);
      setSelectedEquipment(null);
      await refreshEquipment();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo guardar el equipo";
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: CreateEquipmentDto) => {
    if (!selectedEquipment) {
      return;
    }

    try {
      setIsSubmitting(true);
      await updateEquipment(selectedEquipment.id, data);
      setIsFormOpen(false);
      setSelectedEquipment(null);
      await refreshEquipment();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo actualizar el equipo";
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const equipmentToRemove = equipment.find((item) => item.id === id);
    if (!equipmentToRemove) {
      return;
    }

    setEquipmentToDelete(equipmentToRemove);
  };

  const confirmDelete = async () => {
    if (!equipmentToDelete) {
      return;
    }

    try {
      await deleteEquipment(equipmentToDelete.id);
      await refreshEquipment();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo eliminar el equipo";
      window.alert(message);
    } finally {
      setEquipmentToDelete(null);
    }
  };

  const openCreateDialog = () => {
    setSelectedEquipment(null);
    setIsFormOpen(true);
  };

  const openEditDialog = (equipmentToEdit: Equipment) => {
    setSelectedEquipment(equipmentToEdit);
    setIsFormOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Inventario
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Gestión de Inventario
            </h1>
            <p className="mt-1 text-sm text-slate-500">Equipos de cómputo</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => void refreshEquipment()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
            <Button type="button" onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo equipo
            </Button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total</p>
            <p className="mt-2 text-2xl font-semibold">{totalEquipment}</p>
          </div>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Operativos</p>
            <p className="mt-2 text-2xl font-semibold">
              {equipment.filter((item) => item.status === "OPERATIONAL").length}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">En mantenimiento</p>
            <p className="mt-2 text-2xl font-semibold">
              {equipment.filter((item) => item.status === "MAINTENANCE").length}
            </p>
          </div>
        </section>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No se pudo cargar la información</AlertTitle>
            <AlertDescription className="flex items-center justify-between gap-3">
              <span>
                {error === "Failed to fetch"
                  ? "Revisa tu conexión o inténtalo de nuevo."
                  : error}
              </span>
            </AlertDescription>
          </Alert>
        )}

        {error ? null : loading ? (
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">Cargando equipos...</p>
          </div>
        ) : equipment.length === 0 ? (
          <EquipmentEmptyState onCreate={openCreateDialog} />
        ) : (
          <EquipmentTable
            equipment={equipment}
            onEdit={openEditDialog}
            onDelete={handleDelete}
          />
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedEquipment ? "Editar equipo" : "Nuevo equipo"}
            </DialogTitle>
            <DialogDescription>
              {selectedEquipment
                ? "Actualiza la información del equipo seleccionado."
                : "Completa la información para registrar un nuevo equipo."}
            </DialogDescription>
          </DialogHeader>

          <EquipmentForm
            equipment={selectedEquipment}
            isSubmitting={isSubmitting}
            onCancel={() => {
              setSelectedEquipment(null);
              setIsFormOpen(false);
            }}
            onSubmit={selectedEquipment ? handleEdit : handleCreate}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={equipmentToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEquipmentToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <TriangleAlert className="h-6 w-6 text-amber-500" />
            </AlertDialogMedia>
            <AlertDialogTitle>Eliminar equipo</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Deseas eliminar{" "}
              <span className="font-semibold text-foreground">
                {equipmentToDelete?.name}
              </span>
              ?
              <br />
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEquipmentToDelete(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

export default App;
