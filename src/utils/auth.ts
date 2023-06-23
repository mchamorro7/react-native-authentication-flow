import * as Keychain from 'react-native-keychain';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const clientId =
  '1041486702111-75ralaeqsk9jhg9doi1iqi8gea51sjp9.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: clientId,
});

export const signUpWithFirebase = (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User> => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({user}) => user);
};

export const signInByEmail = (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User> => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(({user}) => user);
};

export const signInSilentByEmail = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (!credentials) {
    return;
  }

  const {username: email, password} = credentials;
  return signInByEmail(email, password);
};

export const signInSilentByGoogle = async () => {
  const internetCredentials = await Keychain.getInternetCredentials(
    'googleAuth',
  );
  if (!internetCredentials) {
    return;
  }
  const googleCredential = auth.GoogleAuthProvider.credential(
    internetCredentials.password,
  );
  const {user: storedUser} = await auth().signInWithCredential(
    googleCredential,
  );
  return storedUser;
};

export const googleSignIn = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  await GoogleSignin.signIn();
  const {idToken} = await GoogleSignin.getTokens();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const {user: storedUser} = await auth().signInWithCredential(
    googleCredential,
  );
  return {user: storedUser, clientId, idToken};
};

export const signOut = () =>
  Promise.all([
    auth().signOut(),
    Keychain.resetGenericPassword(),
    Keychain.resetInternetCredentials('googleAuth'),
  ]);
