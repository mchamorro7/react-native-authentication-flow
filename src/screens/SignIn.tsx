import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../providers/AuthProvider';

export const SignInScreen = () => {
  const {login} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>SignIn Screen</Text>
      <Button title="Login" onPress={() => login('test@gmail.com', 'test')} />
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
