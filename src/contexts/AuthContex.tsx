import type { User } from "@prisma/client";
import type { ReactNode } from "react";
import { useCallback } from "react";

import { useContext } from "react";
import { createContext, useState } from "react";
import { trpc } from "../utils/trpc";

interface AuthContextData {
  isAuthenticated: boolean;
  user?: Omit<User, "password">;

  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { mutateAsync: onLogin } = trpc.user.login.useMutation();
  const [user, setUser] = useState<Omit<User, "password">>();
  const isAuthenticated = !!user;

  const handleLogin = useCallback(() => {
    async (email: string, password: string) => {
      const { user } = await onLogin({ email, password });
      setUser(user);
    };
  }, [onLogin]);

  const handleLogout = useCallback(() => {
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
