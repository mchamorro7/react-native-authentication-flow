import React from 'react';
import auth from '@react-native-firebase/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth/lib';
import * as Keychain from 'react-native-keychain';

interface AuthProviderProps {
  user: FirebaseAuthTypes.User | null;
  isLoading?: boolean;
  logout: () => void;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
}

const defaultValue = {
  user: null,
  login: () => {},
  logout: () => {},
  signUp: () => {},
};

export const AuthContext = React.createContext<AuthProviderProps>(defaultValue);

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const {username: email, password} = credentials;
          const currentUser = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          setUser(currentUser.user);
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
      await Keychain.setGenericPassword(email, password);
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
      await Keychain.setGenericPassword(email, password);
      setUser(storedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword();
      await auth().signOut();
      setUser(null);
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
