import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../providers/AuthProvider';

export const SignInScreen = () => {
  const {login, signUp, signInWithGoogle} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>SignIn Screen</Text>
      <Button
        title="SignUp"
        onPress={() => signUp('test@gmail.com', 'test123')}
      />
      <Button
        title="Login"
        onPress={() => login('test@gmail.com', 'test123')}
      />
      <Button title="Sign In with Google" onPress={() => signInWithGoogle()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
