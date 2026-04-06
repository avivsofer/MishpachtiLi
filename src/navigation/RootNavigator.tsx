import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppStackNavigator } from './AppStackNavigator';
import type { RootStackParamList } from './types';
import { AuthScreen } from '../screens/AuthScreen';
import { HouseholdSetupScreen } from '../screens/HouseholdSetupScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { pickByDirection, theme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        animation: pickByDirection('slide_from_right', 'slide_from_left'),
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="HouseholdSetup" component={HouseholdSetupScreen} />
      <Stack.Screen name="App" component={AppStackNavigator} />
    </Stack.Navigator>
  );
}
