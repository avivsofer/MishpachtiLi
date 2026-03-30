import { useEffect } from 'react';
import { DevSettings, I18nManager, StyleSheet, Text, View } from 'react-native';

import { AppRoot } from './src/app/AppRoot';
import { rtlText, theme } from './src/theme';

function ensureRtlEnabled() {
  if (I18nManager.isRTL) {
    return true;
  }

  I18nManager.allowRTL(true);
  I18nManager.swapLeftAndRightInRTL(true);
  I18nManager.forceRTL(true);

  return false;
}

const rtlReadyAtLaunch = ensureRtlEnabled();

export default function App() {
  const rtlReady = rtlReadyAtLaunch;

  useEffect(() => {
    if (rtlReady) {
      return;
    }

    if (__DEV__) {
      DevSettings.reload();
    }
  }, [rtlReady]);

  if (!rtlReady) {
    return (
      <View style={styles.boot}>
        <Text style={styles.bootTitle}>מפעילים תצוגת RTL</Text>
        <Text style={styles.bootText}>
          האפליקציה מבצעת אתחול חד־פעמי כדי לעלות בעברית בכיוון נכון.
        </Text>
      </View>
    );
  }

  return <AppRoot />;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  bootTitle: {
    ...theme.typography.section,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  bootText: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
