import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    if (userToken) {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {headers: {Authorization: `Tariq__${userToken}`}});
      setUserData(data);
    } 
  }

  useEffect(() => {
    getUserData();
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData }}>
      {children}
    </UserContext.Provider>
  );
}