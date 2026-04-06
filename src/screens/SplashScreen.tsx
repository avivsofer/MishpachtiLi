import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { RootScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { inlineEnd, inlineStart, logicalText, logicalTextBlock, theme } from '../theme';

export function SplashScreen({ navigation }: RootScreenProps<'Splash'>) {
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const session = useAppStore((state) => state.session);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const timer = setTimeout(() => {
      if (!session.hasSeenWelcome) {
        navigation.replace('Welcome');
        return;
      }

      if (!session.isAuthenticated) {
        navigation.replace('Auth');
        return;
      }

      if (!session.householdReady) {
        navigation.replace('HouseholdSetup');
        return;
      }

      navigation.replace('App');
    }, 1200);

    return () => clearTimeout(timer);
  }, [hasHydrated, navigation, session]);

  return (
    <View style={styles.container}>
      <View style={styles.orbLarge} />
      <View style={styles.orbSmall} />
      <View style={styles.brand}>
        <Text style={styles.kicker}>עוזר הבית המשפחתי</Text>
        <Text style={styles.title}>משפחתילי</Text>
        <Text style={styles.subtitle}>
          קניות, מלאי, משימות ורעיונות קטנים שמחזיקים בית יחד.
        </Text>
      </View>
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xxl,
    gap: theme.spacing.hero,
  },
  orbLarge: {
    position: 'absolute',
    top: 100,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: theme.colors.primarySoft,
    ...inlineStart(-40),
  },
  orbSmall: {
    position: 'absolute',
    bottom: 120,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.colors.accentSoft,
    ...inlineEnd(-30),
  },
  brand: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  kicker: {
    ...theme.typography.label,
    ...logicalText,
    color: theme.colors.primary,
  },
  title: {
    ...theme.typography.hero,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
});
