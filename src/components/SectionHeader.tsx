import { Pressable, StyleSheet, Text, View } from 'react-native';

import { logicalRow, logicalText, logicalTextBlock, theme } from '../theme';

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
        <View style={styles.copy}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={3} style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {actionLabel && onActionPress ? (
          <Pressable onPress={onActionPress} style={({ pressed }) => [styles.actionPill, pressed && styles.actionPillPressed]}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        ) : null}
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
  copy: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing.sm,
    alignItems: 'stretch',
  },
  title: {
    ...theme.typography.section,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.meta,
    ...logicalTextBlock,
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
    ...logicalText,
    color: theme.colors.primary,
  },
});
