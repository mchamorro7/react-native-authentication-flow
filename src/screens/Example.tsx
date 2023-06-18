import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../providers/AuthProvider';

export const ExampleScreen = () => {
  const {logout} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Example Screen</Text>
      <Text>To see this screen must be logged!</Text>
      <Button title="Logout" onPress={() => logout()} />
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
