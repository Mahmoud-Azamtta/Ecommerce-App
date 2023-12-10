import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

function Profile() {
  const { isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-blob-scene-light bg-cover bg-no-repeat dark:bg-blob-scene-orange">
      <div className="grid grid-cols-6 gap-10">
        <aside className="sticky left-0 top-20 col-span-1 mt-20 h-96 rounded-r-xl border border-l-0 border-gray-500 bg-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
          <ul>
            <Link to={""}>
              <li className="mb-3 rounded-md px-2 py-1 text-xl font-bold transition hover:bg-gray-400 dark:hover:bg-gray-600">
                User Information
              </li>
            </Link>
            <Link to={"user-contacts"}>
              <li className="mb-3 rounded-md px-2 py-1 text-xl font-bold transition hover:bg-gray-400 dark:hover:bg-gray-600">
                Contects
              </li>
            </Link>
          </ul>
        </aside>
        <div className="col-span-5 flex h-screen items-center justify-center">
          <div className="login md:8/12 w-11/12 rounded-3xl border border-gray-600 bg-white px-5 py-6 shadow-xl dark:bg-gray-900 sm:w-8/12 sm:p-10 lg:w-7/12 xl:w-6/12">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
