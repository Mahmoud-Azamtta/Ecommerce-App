import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

function UserInfo() {
  const { userData } = useContext(UserContext);
  console.log(userData);
  return (
    <React.Fragment>
      <div className="flex justify-center">
        <img
          src={userData.user.image.secure_url}
          alt="profile picure"
          className="w-1/3 rounded-xl border border-gray-700"
        />
      </div>
      <h1 className="text-center capitalize mt-5 text-4xl font-bold pb-3 border-b dark:border-gray-600 border-gray-300">{userData.user.userName}</h1>
      <div className="w-8/12 mx-auto mt-5">
        <div className="flex justify-between">
          <span className="font-bold text-lg">Role</span>
          <span className="text-lg">{userData.user.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-lg">Status</span>
          <span className="text-lg">{userData.user.status}</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserInfo;
