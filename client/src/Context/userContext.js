import { createContext, UseEffect, UseState } from "react";
import axios from "axios";

export const usercontext = createContext({});

export function usercontextProvider({ children }) {
  const [user, setUser] = UseState(null);
  UseEffect(() => {
    if (!user) {
      axios.get("/user");
    }
  }, []);

  return (
    <usercontext.Provider value={{ user, setUser }}>
      {children}
    </usercontext.Provider>
  );
}
