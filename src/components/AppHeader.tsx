import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlTextBlock, theme } from '../theme';
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
        {showBack && onBack ? (
          <View style={styles.leadingSlot}>
            <IconButton icon="chevron-right" onPress={onBack} />
          </View>
        ) : null}
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
        {trailing ? <View style={styles.trailingSlot}>{trailing}</View> : null}
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
    alignItems: 'stretch',
  },
  title: {
    ...theme.typography.title,
    ...rtlTextBlock,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    ...rtlTextBlock,
    color: theme.colors.textSecondary,
  },
});
