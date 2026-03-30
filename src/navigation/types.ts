import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type MainTabParamList = {
  Home: undefined;
  Shopping: undefined;
  Inventory: undefined;
  Lists: undefined;
  More: undefined;
};

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList> | undefined;
  SingleList: { listId: string };
  Gifts: undefined;
  Tasks: undefined;
  HouseholdMembers: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Auth: undefined;
  HouseholdSetup: undefined;
  App: NavigatorScreenParams<AppStackParamList> | undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type AppTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type AppStackNavigation = NativeStackNavigationProp<AppStackParamList>;
