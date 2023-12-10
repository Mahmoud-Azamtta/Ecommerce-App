import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getUserData = async () => {
    if (userToken) {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {headers: {Authorization: `Tariq__${userToken}`}});
      setUserData(data);
      setLoading(false);
    } 
  }

  useEffect(() => {
    getUserData();
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}