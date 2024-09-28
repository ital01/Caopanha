import { createContext, ReactNode, useContext, useState } from "react";
import { iAuthContextProps } from "../interfaces/context/auth-context";
import iSignIn from "../interfaces/hooks/auth";
import { iUserProps } from "../interfaces/hooks/user";
import Cookies from 'js-cookie'
import api from "../services/api";
import dayjs from 'dayjs'
import { useNavigate } from "react-router-dom";



export const AuthContext = createContext<iAuthContextProps>({} as iAuthContextProps);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<iUserProps | null>(null);

  const navigate = useNavigate(); // Chama useNavigate

  async function signIn({ ...props }: iSignIn): Promise<undefined> {
    try {
      const { data } = await api.post("/auth/login", {
        ...props,
      });

      Cookies.set(
        "@user",
        {
          ...data,
        },
        { expires: dayjs().add(7, "days").toDate() }
      );

      setUser(data)

      api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error)
    }
  }

  async function logout() {
    Cookies.remove("@user")
    navigate("/home");
  }

  async function me(): Promise<boolean> {
    let user = Cookies.get("@user")?.toString() as any;
    user = user ? (JSON.parse(user) as iUserProps) : false;

    if (user) {
      setUser(user);
      if (true) {
        api.defaults.headers["Authorization"] = `Bearer ${user.access_token}`;
        return true;
      } else {
        logout();
      }
    } else {
    //   router.push("/auth");
    }

    return false;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, logout, me }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);