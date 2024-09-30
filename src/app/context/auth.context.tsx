import { createContext, ReactNode, useState } from "react";
import { iAuthContextProps } from "../interfaces/context/auth-context";
import { iSignIn } from "../interfaces/hooks/auth";
import { iUserProps } from "../interfaces/hooks/user";
import Cookies from 'js-cookie';
import api from "../services/api";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<iAuthContextProps>({} as iAuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<iUserProps | null>(null);
  const navigate = useNavigate();

  async function signIn(props: iSignIn): Promise<string | undefined> {
    try {
      const { data } = await api.post("/auth/login", props);

      Cookies.set("@user", JSON.stringify(data), {
        expires: dayjs().add(7, "days").toDate(),
      });

      setUser(data);
      api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;

      navigate("/dashboard");
      return data.access_token;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function logout() {
    Cookies.remove("@user");
    navigate("/home");
  }

  async function me(): Promise<boolean> {
    const userCookie = Cookies.get("@user");
    const user = userCookie ? (JSON.parse(userCookie) as iUserProps) : null;

    if (user) {
      setUser(user);
      api.defaults.headers["Authorization"] = `Bearer ${user.access_token}`;
      return true;
    } else {
      logout();
    }

    return false;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, logout, me }}>
      {children}
    </AuthContext.Provider>
  );
}
