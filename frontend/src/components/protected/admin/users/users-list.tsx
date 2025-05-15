"use client";

import User from "./user";
import Loading from "../../shared/response/loading";
import ErrorMsg from "../../shared/response/error-msg";
import Pagination from "../../shared/list/pagination";
import useUsers from "@/lib/hooks/users/useUsers";

export default function UsersList() {
  const { data, isLoading, isError, setCurrentPage, isPageChanging } = useUsers(
    { per_page: 8 }
  );

  return (
    <section className="pt-2 space-y-2">
      {isLoading || isPageChanging ? (
        <Loading />
      ) : isError ? (
        <ErrorMsg msg="Error fetching users" />
      ) : (
        data?.data.users.map(user => <User key={user.id} user={user} />)
      )}
      <Pagination
        currentPage={data?.meta.current_page ?? 1}
        setCurrentPage={setCurrentPage}
        lastPage={data?.meta.last_page ?? 1}
      />
    </section>
  );
}
