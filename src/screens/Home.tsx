import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigatorParamList} from '../navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackNavigatorParamList,
  'Home'
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to auth"
        onPress={() => navigation.navigate('ShouldLoggedIn')}
      />
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
