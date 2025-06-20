import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ClinicForm from "./_components/form";

const ClinicFormPage = () => {
  return (
    <div>
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Adicione uma nova clínica para continuar.
            </DialogDescription>
          </DialogHeader>

          <ClinicForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicFormPage;
