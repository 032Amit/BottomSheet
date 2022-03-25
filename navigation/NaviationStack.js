import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Screens from './Screens';
import ScreenA from '../Screens/ScreenA';
import ScreenB from '../Screens/ScreenB';

const InitialStack = createStackNavigator();

const NavigationStack = () => {
  return (
    <InitialStack.Navigator
      initialRouteName={Screens.ScreenA}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTintColor: '#fff',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <InitialStack.Screen
        name={Screens.ScreenA}
        component={ScreenA}
        options={{headerShown: false}}
      />
      <InitialStack.Screen
        name={Screens.ScreenB}
        component={ScreenB}
        options={{headerShown: false}}
      />
    </InitialStack.Navigator>
  );
};

export default NavigationStack;
