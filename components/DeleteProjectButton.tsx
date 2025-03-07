"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { deleteProject } from "@/lib/actions";

const DeleteProjectButton = ({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteProject(projectId);

      if (response.status === "SUCCESS") {
        router.push("/");
        toast.success("Proje başarıyla silindi!");
      } else {
        toast.error("Proje silinirken bir hata oluştu.");
      }
    } catch (error) {
      toast.error("Proje silinirken bir hata oluştu.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          disabled={isDeleting}
        >
          <Trash2 className="size-4" />
          {isDeleting ? "Siliniyor..." : "Sil"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Projeyi silmek istediğinize emin misiniz?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-semibold">{projectTitle}</span> adlı projeyi
            silmek üzeresiniz. Bu işlem geri alınamaz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectButton;
