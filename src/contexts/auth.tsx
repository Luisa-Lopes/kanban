import { IRegisterResponse } from "@/Interfaces/Auth";
import { login, register, validateToken } from "@/services/Auth";
import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  signed: boolean;
  signin: (email: string, password: string) => Promise<string | void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<IRegisterResponse>;
  signout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signed: false,
  signin: async () => undefined,
  signup: async () => ({}) as IRegisterResponse,
  signout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("user_token");

      if (!token) return;

      try {
        const user = await validateToken();

        setUser({
          email: user.email,
          token,
        });
      } catch {
        localStorage.removeItem("user_token");
      }
    };

    loadUser();
  }, []);

  const signin = async (email: string, password: string): Promise<void> => {
    const response = await login({
      email,
      password,
    });

    localStorage.setItem("user_token", response.dados);

    setUser({
      email,
      token: response.dados,
    });
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<IRegisterResponse> => {
    return await register({
      email,
      password,
      firstName,
      lastName,
    });
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
