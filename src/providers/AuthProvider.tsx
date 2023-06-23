import React from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth/lib';
import * as Keychain from 'react-native-keychain';
import {
  googleSignIn,
  signInByEmail,
  signInSilentByEmail,
  signInSilentByGoogle,
  signOut,
  signUpWithFirebase,
} from '../utils/auth';

interface AuthProviderProps {
  user: FirebaseAuthTypes.User | null;
  isLoading?: boolean;
  logout: () => void;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signInWithGoogle: () => void;
}

const defaultValue = {
  user: null,
  login: () => {},
  logout: () => {},
  signUp: () => {},
  signInWithGoogle: () => {},
};

export const AuthContext = React.createContext<AuthProviderProps>(defaultValue);

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userSignedByEmail = await signInSilentByEmail();
        if (userSignedByEmail) {
          setUser(userSignedByEmail);
          return;
        }

        const userSignedByGoogle = await signInSilentByGoogle();
        if (userSignedByGoogle) {
          setUser(userSignedByGoogle);
        }
      } catch (error) {
        console.error(checkUserLoggedIn.name, error);
      }
      setIsLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const newUser = await signUpWithFirebase(email, password);
      await Keychain.setGenericPassword(email, password);
      setUser(newUser);
    } catch (error) {
      console.error(signUp.name, error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const storedUser = await signInByEmail(email, password);
      await Keychain.setGenericPassword(email, password);
      setUser(storedUser);
    } catch (error) {
      console.error(login.name, error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const googleData = await googleSignIn();
      if (googleData) {
        const {user: storedUser, clientId, idToken} = googleData;
        await Keychain.setInternetCredentials('googleAuth', clientId, idToken);
        setUser(storedUser);
      }
    } catch (error) {
      console.error(signInWithGoogle.name, error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error(logout.name, error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signInWithGoogle,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
