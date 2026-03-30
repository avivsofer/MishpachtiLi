import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeDashboardScreen } from '../screens/HomeDashboardScreen';
import { InventoryScreen } from '../screens/InventoryScreen';
import { ListsScreen } from '../screens/ListsScreen';
import { MoreScreen } from '../screens/MoreScreen';
import { ShoppingListScreen } from '../screens/ShoppingListScreen';
import { AppTabBar } from './TabBar';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function AppTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeDashboardScreen} />
      <Tab.Screen name="Shopping" component={ShoppingListScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
      <Tab.Screen name="Lists" component={ListsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
