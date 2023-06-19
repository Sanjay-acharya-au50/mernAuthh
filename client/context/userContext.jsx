// import axios from "axios";
import { createContext,  useState } from "react";

export const UserContext = createContext(null);

export function UseProvider({ children }) {
  const [user, setUser] = useState(null);
  return (

      <UserContext.Provider value={{user, setUser}}>
        {children}
      </UserContext.Provider>

  );
}
