"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { UpsertPatientForm } from "./upsert-patient-form";

export const AddPatientButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Paciente
        </Button>
      </DialogTrigger>
      <UpsertPatientForm onSuccess={() => setOpen(false)} isOpen={open} />
    </Dialog>
  );
};
