import {
  type ReactNode,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react";

import type { User } from "@prisma/client";

import { trpc } from "../utils/trpc";

interface IAuthContextData {
  isAuthenticated: boolean;
  user?: Omit<User, "password">;

  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { mutateAsync: onLogin } = trpc.user.login.useMutation();

  const [user, setUser] = useState<Omit<User, "password">>();
  const isAuthenticated = !!user;

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const { user } = await onLogin({ email, password });
        setUser(user);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [onLogin]
  );

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

AuthProvider.displayName = "AuthProviderComponent";

export const useAuth = () => useContext(AuthContext);
