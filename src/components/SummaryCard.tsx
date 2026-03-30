import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlTextBlock, theme } from '../theme';
import type { Tone } from '../types/ui';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type SummaryCardProps = {
  label: string;
  value: number;
  caption: string;
  icon: IconName;
  tone: Tone;
};

const badgeTone: Record<
  Tone,
  { background: string; color: string; borderColor: string }
> = {
  primary: {
    background: theme.colors.primarySoft,
    color: theme.colors.primary,
    borderColor: theme.colors.primaryBorder,
  },
  accent: {
    background: theme.colors.accentSoft,
    color: theme.colors.accent,
    borderColor: theme.colors.accentBorder,
  },
  success: {
    background: theme.colors.successSoft,
    color: theme.colors.success,
    borderColor: theme.colors.successBorder,
  },
  warning: {
    background: theme.colors.warningSoft,
    color: theme.colors.warning,
    borderColor: theme.colors.warningBorder,
  },
  danger: {
    background: theme.colors.dangerSoft,
    color: theme.colors.danger,
    borderColor: theme.colors.dangerBorder,
  },
  neutral: {
    background: theme.colors.surfaceMuted,
    color: theme.colors.textSecondary,
    borderColor: theme.colors.border,
  },
};

export function SummaryCard({
  label,
  value,
  caption,
  icon,
  tone,
}: SummaryCardProps) {
  const colors = badgeTone[tone];

  return (
    <View style={styles.card}>
      <View style={[styles.accentRail, { backgroundColor: colors.color }]} />
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.label}>
            {label}
          </Text>
          <Text numberOfLines={2} style={styles.caption}>
            {caption}
          </Text>
        </View>
        <View
          style={[
            styles.iconBadge,
            {
              backgroundColor: colors.background,
              borderColor: colors.borderColor,
            },
          ]}
        >
          <MaterialCommunityIcons color={colors.color} name={icon} size={18} />
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 118,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.lg,
    overflow: 'hidden',
    ...theme.shadow.soft,
  },
  accentRail: {
    position: 'absolute',
    right: 0,
    top: 16,
    bottom: 16,
    width: 4,
    borderRadius: 999,
  },
  header: {
    ...rtlRow,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  copy: {
    flex: 1,
    gap: theme.spacing.xs,
    alignItems: 'stretch',
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  value: {
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    ...rtlTextBlock,
  },
  label: {
    ...theme.typography.bodyStrong,
    ...rtlTextBlock,
    color: theme.colors.textPrimary,
  },
  caption: {
    ...theme.typography.meta,
    ...rtlTextBlock,
    color: theme.colors.textSecondary,
  },
});
