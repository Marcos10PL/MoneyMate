import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { User as UserType } from "@/lib/types";
import ListCard, {
  ListCardFooter,
  ListCardInfo,
  ListCardName,
} from "../../shared/list/list-card";
import DeleteAlert from "../../shared/list/delete-alert";
import { useState } from "react";
import { useDeleteUserMutation } from "@/lib/state/features/users/api-users-slice";
import { toast } from "sonner";

type UserProps = {
  user: UserType;
};

export default function User({ user }: UserProps) {
  const [userAuth] = useLocalStorage<UserType | null>("user", null);
  const [open, setOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = (id: string) => {
    deleteUser(id)
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success("User deleted successfully");
      })
      .catch(error => {
        console.error("Delete user failed:", error);
        toast.error("Delete user failed. Please try again.");
      });
  };

  const you = userAuth?.id === user.id;

  return (
    <ListCard className="min-h-14">
      <ListCardName className="flex items-center justify-between">
        <p className="font-bold">
          {user.name} <span className="text-gray-500">({user.role})</span>{" "}
        </p>
        <p className="text-sm text-neutral-500">
          {new Date(user.created_at).toLocaleString()}
        </p>
      </ListCardName>
      <ListCardInfo>
        <p className="text-sm text-gray-500">{user.email}</p>
        <ListCardFooter>
          {you ? (
            <span>(you)</span>
          ) : (
            <DeleteAlert
              id={user.id.toString()}
              open={open}
              setOpen={setOpen}
              handleDelete={handleDelete}
              isLoading={isLoading}
            />
          )}
        </ListCardFooter>
      </ListCardInfo>
    </ListCard>
  );
}
