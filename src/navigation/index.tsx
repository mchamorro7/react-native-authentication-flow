import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../screens/SignIn';
import {ExampleScreen} from '../screens/Example';
import {AuthContext, AuthProvider} from '../providers/AuthProvider';
import {HomeScreen} from '../screens/Home';

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();
const MainStack = createNativeStackNavigator<MainStackNavigatorParamList>();

export type RootStackNavigatorParamList = {
  Home: undefined;
  ShouldLoggedIn: undefined;
};

export type MainStackNavigatorParamList = {
  Example: undefined;
  SignIn: undefined;
};

const MainNavigator = () => {
  const {user} = React.useContext(AuthContext);

  return (
    <MainStack.Navigator>
      {user ? (
        <MainStack.Screen name="Example" component={ExampleScreen} />
      ) : (
        <MainStack.Screen name="SignIn" component={SignInScreen} />
      )}
    </MainStack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="ShouldLoggedIn" component={MainNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default RootNavigator;
