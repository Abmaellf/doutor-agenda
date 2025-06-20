"use client";

import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { deleteAppointment } from "@/actions/delete-appointment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

interface AppointmentTableActionsProps {
  appointment: typeof appointmentsTable.$inferSelect & {
    patient: typeof patientsTable.$inferSelect | null;
    doctor: typeof doctorsTable.$inferSelect | null;
  };
}

export const AppointmentTableActions = ({
  appointment,
}: AppointmentTableActionsProps) => {
  const deleteAppointmentAction = useAction(deleteAppointment, {
    onSuccess: () => {
      toast.success("Agendamento deletado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar agendamento");
    },
  });

  const handleDeleteAppointmentClick = () => {
    deleteAppointmentAction.execute({ id: appointment.id });
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {appointment.patient?.name} com {appointment.doctor?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <TrashIcon className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar esse agendamento?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser revertida.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAppointmentClick}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
