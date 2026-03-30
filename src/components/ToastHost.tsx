import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppStore } from '../store/useAppStore';
import { rtlRow, rtlText, theme } from '../theme';

export function ToastHost() {
  const insets = useSafeAreaInsets();
  const toast = useAppStore((state) => state.activeToast);
  const dismissToast = useAppStore((state) => state.dismissToast);
  const translateY = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    if (!toast) {
      Animated.timing(translateY, {
        toValue: 120,
        duration: 180,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(translateY, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      dismissToast();
    }, 2600);

    return () => clearTimeout(timer);
  }, [dismissToast, toast, translateY]);

  if (!toast) {
    return null;
  }

  const toneColor =
    toast.tone === 'success'
      ? theme.colors.success
      : toast.tone === 'warning'
        ? theme.colors.warning
        : theme.colors.primary;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        { bottom: insets.bottom + theme.layout.tabBarHeight + theme.spacing.lg },
        { transform: [{ translateY }] },
      ]}
    >
      <Pressable onPress={dismissToast} style={styles.toast}>
        <View style={[styles.toneIndicator, { backgroundColor: toneColor }]} />
        <View style={styles.copy}>
          <Text style={styles.title}>{toast.title}</Text>
          {toast.description ? (
            <Text style={styles.description}>{toast.description}</Text>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: theme.spacing.xl,
    right: theme.spacing.xl,
  },
  toast: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    ...rtlRow,
    gap: theme.spacing.md,
    ...theme.shadow.floating,
  },
  toneIndicator: {
    width: 4,
    borderRadius: 999,
  },
  copy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  title: {
    ...theme.typography.bodyStrong,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  description: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
