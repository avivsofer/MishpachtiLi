import { Pressable, StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlText, theme } from '../theme';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}: SectionHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        {actionLabel && onActionPress ? (
          <Pressable onPress={onActionPress} style={({ pressed }) => [styles.actionPill, pressed && styles.actionPillPressed]}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {subtitle ? (
        <Text numberOfLines={3} style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
  },
  topRow: {
    ...rtlRow,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: theme.spacing.md,
  },
  title: {
    flex: 1,
    ...theme.typography.section,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  actionPill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionPillPressed: {
    opacity: 0.9,
  },
  action: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.primary,
  },
});
