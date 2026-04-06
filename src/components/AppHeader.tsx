import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  inlineEndAlign,
  inlineStartAlign,
  logicalRow,
  logicalTextBlock,
  pickByDirection,
  theme,
} from '../theme';
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
            <IconButton icon={pickByDirection('chevron-right', 'chevron-left')} onPress={onBack} />
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
    alignSelf: 'stretch',
    gap: theme.spacing.sm,
  },
  topRow: {
    ...logicalRow,
    width: '100%',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  leadingSlot: {
    width: 40,
    alignItems: inlineStartAlign,
    flexShrink: 0,
  },
  trailingSlot: {
    minWidth: 40,
    alignItems: inlineEndAlign,
    flexShrink: 0,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing.xs,
    alignItems: 'stretch',
  },
  title: {
    ...theme.typography.title,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
});
