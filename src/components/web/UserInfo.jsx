import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import Loader from "../shared/Loader";

function UserInfo() {
  const { userData } = useContext(UserContext);

  return (
    <React.Fragment>
      <div className="flex justify-center">
        <img
          src={userData.user.image.secure_url}
          alt="profile picure"
          className="w-1/3 rounded-xl border border-gray-700"
        />
      </div>
      <h1 className="mt-5 border-b border-gray-300 pb-3 text-center text-4xl font-bold capitalize dark:border-gray-600">
        {userData.user.userName}
      </h1>
      <div className="mx-auto mt-5 w-8/12">
        <div className="flex justify-between">
          <span className="text-lg font-bold">Role</span>
          <span className="text-lg">{userData.user.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-bold">Status</span>
          <span className="text-lg">{userData.user.status}</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserInfo;
