import Spinner from "@/components/spinner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type AlertDeleteProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id?: string) => void;
  isLoading: boolean;
  id?: string;
  textButton?: true;
};

export default function DeleteAlert({
  open,
  setOpen,
  handleDelete,
  isLoading,
  id,
  textButton,
}: AlertDeleteProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {textButton ? (
          <Button variant="destructive" className="w-full max-w-sm">
            Delete Account
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            <TrashIcon className="h-4 w-4 text-red-400" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => handleDelete(id ? id : undefined)}
            disabled={isLoading || !open}
            className="min-w-20"
          >
            {isLoading ? <Spinner /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
