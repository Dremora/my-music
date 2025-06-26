import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type LoginContextType = {
  isLoggedIn: boolean;
  onLoggedIn: (token: string) => void;
  onLoggedOut: () => void;
  token: string | null;
};

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  onLoggedIn: () => {
    throw new Error("LoginContext is not provided");
  },
  onLoggedOut: () => {
    throw new Error("LoginContext is not provided");
  },
  token: null,
});

type LoginProviderProps = {
  readonly children: ReactNode;
};

export function LoginProvider({ children }: LoginProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const onLoggedIn = useCallback((newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }, []);

  const onLoggedOut = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      onLoggedOut,
      onLoggedIn,
      isLoggedIn: Boolean(token),
      token,
    }),
    [token, onLoggedIn, onLoggedOut],
  );

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => {
  return useContext(LoginContext);
};
