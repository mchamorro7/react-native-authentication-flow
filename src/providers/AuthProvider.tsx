import React from 'react';

interface AuthProviderProps {
  user?: Record<any, any>;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoading?: boolean;
}

const defaultValue = {
  login: () => {},
  logout: () => {},
};

export const AuthContext = React.createContext<AuthProviderProps>(defaultValue);

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = React.useState<Record<any, any> | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = 'token';
        if (token) {
          // Verify the token with Firebase
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email: string, _password: string) => {
    setUser({email});
  };

  const logout = async () => {
    setUser(undefined);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
