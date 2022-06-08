import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoginContextType {
  isLoggedIn: boolean;
  onLoggedIn: (token: string) => void;
  onLoggedOut: () => void;
  token: string | null;
}

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  onLoggedIn: () => {
    throw new Error();
  },
  onLoggedOut: () => {
    throw new Error();
  },
  token: null,
});

interface Props {
  children: ReactNode;
}

export const LoginProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const onLoggedIn = useCallback((newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }, []);

  const onLoggedOut = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  return (
    <LoginContext.Provider
      value={{ onLoggedOut, onLoggedIn, isLoggedIn: !!token, token }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(LoginContext);
};
