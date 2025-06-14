"use client";

import { TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePatient } from "@/actions/delete-patient";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import { UpsertPatientForm } from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const [open, setOpen] = useState(false);

  const deletePatientAction = useAction(deletePatient, {
    onSuccess: () => {
      toast.success("Paciente deletado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar paciente");
    },
  });

  const handleDeletePatientClick = () => {
    if (!patient) return;
    deletePatientAction.execute({ id: patient.id });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>{patient.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Telefone:</span>
            <span>{patient.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Sexo:</span>
            <span>{patient.sex === "male" ? "Masculino" : "Feminino"}</span>
          </div>
        </div>

        <Separator />
        <CardFooter className="flex flex-col gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Ver detalhes</Button>
            </DialogTrigger>
            <UpsertPatientForm
              patient={patient}
              onSuccess={() => setOpen(false)}
              isOpen={open}
            />
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <TrashIcon className="mr-2 h-4 w-4" />
                Deletar Paciente
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja deletar esse paciente?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser revertida. Isso irá deletar o paciente
                  e todas as consultas agendadas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletePatientClick}>
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
