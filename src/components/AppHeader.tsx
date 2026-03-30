import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlText, theme } from '../theme';
import { IconButton } from './Buttons';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  trailing?: ReactNode;
};

export function AppHeader({
  title,
  subtitle,
  showBack,
  onBack,
  trailing,
}: AppHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <View style={styles.leadingSlot}>
          {showBack && onBack ? (
            <IconButton icon="chevron-right" onPress={onBack} />
          ) : null}
        </View>
        <View style={styles.titleBlock}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={2} style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.trailingSlot}>{trailing}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
  },
  topRow: {
    ...rtlRow,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  leadingSlot: {
    width: 40,
    alignItems: 'flex-end',
  },
  trailingSlot: {
    minWidth: 40,
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  title: {
    ...theme.typography.title,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
