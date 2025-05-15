import Header from "../../shared/header";
import UsersList from "./users-list";

export default function Users() {
  return (
    <>
      <Header title="Users" backButton />
      <UsersList />
    </>
  );
}
