import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { logicalRow, logicalText, theme } from '../theme';

const tabMeta = {
  Home: {
    label: 'בית',
    icon: 'home-variant-outline',
    activeIcon: 'home-variant',
  },
  Shopping: {
    label: 'קניות',
    icon: 'cart-outline',
    activeIcon: 'cart',
  },
  Inventory: {
    label: 'יש בבית',
    icon: 'fridge-outline',
    activeIcon: 'fridge',
  },
  Lists: {
    label: 'רשימות',
    icon: 'format-list-bulleted-square',
    activeIcon: 'format-list-checkbox',
  },
  More: {
    label: 'עוד',
    icon: 'dots-horizontal-circle-outline',
    activeIcon: 'dots-horizontal-circle',
  },
} as const;

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + theme.spacing.md }]}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const options = descriptors[route.key].options;
          const meta = tabMeta[route.name as keyof typeof tabMeta];

          return (
            <Pressable
              accessibilityRole="button"
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={({ pressed }) => [
                styles.item,
                isFocused && styles.itemActive,
                pressed && { opacity: 0.88 },
              ]}
            >
              <MaterialCommunityIcons
                color={isFocused ? theme.colors.primary : theme.colors.textMuted}
                name={isFocused ? meta.activeIcon : meta.icon}
                size={22}
              />
              <Text style={[styles.label, isFocused && styles.labelActive]}>
                {options.tabBarLabel?.toString() || meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md,
  },
  container: {
    ...logicalRow,
    backgroundColor: theme.colors.backgroundElevated,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    ...theme.shadow.floating,
  },
  item: {
    flex: 1,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    borderRadius: 20,
  },
  itemActive: {
    backgroundColor: theme.colors.primarySoft,
  },
  label: {
    ...theme.typography.caption,
    ...logicalText,
    color: theme.colors.textMuted,
  },
  labelActive: {
    color: theme.colors.primary,
  },
});
