import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

function Contacts() {
  const {userData} = useContext(UserContext);
  return (
    <React.Fragment>
      <div className="flex justify-center">
        <p className="text-center text-xl">{userData.user.email}</p>
      </div>
    </React.Fragment>
  );
}

export default Contacts;
