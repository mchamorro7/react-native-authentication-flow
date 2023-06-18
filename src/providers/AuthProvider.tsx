import React from 'react';
import auth from '@react-native-firebase/auth';

interface AuthProviderProps {
  user?: Record<any, any>;
  isLoading?: boolean;
  logout: () => void;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
}

const defaultValue = {
  login: () => {},
  logout: () => {},
  signUp: () => {},
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
          // TODO: verify stored credentials with Firebase
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const {user: storedUser} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      // const token = await user.getIdToken();
      // TODO: store credentials in keychain
      setUser(storedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const {user: storedUser} = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      // const token = await user.getIdToken();
      // TODO: store credentials in keychain
      setUser(storedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      // TODO: remove credentials from keychain
      await auth().signOut();
      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
