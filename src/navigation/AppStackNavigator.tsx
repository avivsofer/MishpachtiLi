import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GiftsScreen } from '../screens/GiftsScreen';
import { HouseholdMembersScreen } from '../screens/HouseholdMembersScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SingleListScreen } from '../screens/SingleListScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { theme } from '../theme';
import { AppTabsNavigator } from './MainTabsNavigator';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background, direction: 'rtl' },
        animation: 'slide_from_left',
      }}
    >
      <Stack.Screen name="Tabs" component={AppTabsNavigator} />
      <Stack.Screen name="SingleList" component={SingleListScreen} />
      <Stack.Screen name="Gifts" component={GiftsScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="HouseholdMembers" component={HouseholdMembersScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
