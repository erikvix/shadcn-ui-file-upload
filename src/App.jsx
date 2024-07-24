import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload from "./components/custom/FileUpload";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen flex-col space-y-4">
      <h1 className="text-5xl font-semibold">File Vault</h1>
      <p className="text-muted-foreground">File upload component for React</p>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow">File upload</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Envio de Arquivos</DialogTitle>
              <DialogDescription>
                Solte os arquivos aqui tal tal
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FileUpload />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
