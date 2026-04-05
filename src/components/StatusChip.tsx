import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  inlineStartSelf,
  logicalRow,
  logicalRowReverse,
  ltrText,
  rtlText,
  theme,
} from '../theme';
import type { Tone } from '../types/ui';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type StatusChipProps = {
  label: string;
  tone: Tone;
  icon?: IconName;
  size?: 'sm' | 'md';
  direction?: 'rtl' | 'ltr';
};

const toneMap = {
  primary: {
    backgroundColor: theme.colors.primarySoft,
    color: theme.colors.primary,
    borderColor: theme.colors.primaryBorder,
  },
  accent: {
    backgroundColor: theme.colors.accentSoft,
    color: theme.colors.accent,
    borderColor: theme.colors.accentBorder,
  },
  success: {
    backgroundColor: theme.colors.successSoft,
    color: theme.colors.success,
    borderColor: theme.colors.successBorder,
  },
  warning: {
    backgroundColor: theme.colors.warningSoft,
    color: theme.colors.warning,
    borderColor: theme.colors.warningBorder,
  },
  danger: {
    backgroundColor: theme.colors.dangerSoft,
    color: theme.colors.danger,
    borderColor: theme.colors.dangerBorder,
  },
  neutral: {
    backgroundColor: theme.colors.surfaceMuted,
    color: theme.colors.textSecondary,
    borderColor: theme.colors.border,
  },
} as const;

export function StatusChip({
  label,
  tone,
  icon,
  size = 'md',
  direction = 'rtl',
}: StatusChipProps) {
  const colors = toneMap[tone];
  const compact = size === 'sm';

  return (
    <View
      style={[
        styles.wrapper,
        compact && styles.wrapperCompact,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
        },
      ]}
    >
      <View style={[styles.content, direction === 'ltr' ? styles.contentLtr : styles.contentRtl]}>
        {icon ? (
          <MaterialCommunityIcons
            color={colors.color}
            name={icon}
            size={compact ? 12 : 14}
          />
        ) : null}
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            compact && styles.labelCompact,
            direction === 'ltr' ? styles.labelLtr : styles.labelRtl,
            { color: colors.color },
          ]}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: inlineStartSelf,
    maxWidth: '100%',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
  },
  wrapperCompact: {
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: theme.spacing.xs + 1,
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  contentRtl: {
    ...logicalRow,
  },
  contentLtr: {
    ...logicalRowReverse,
  },
  label: {
    ...theme.typography.meta,
    flexShrink: 1,
  },
  labelRtl: {
    ...rtlText,
  },
  labelLtr: {
    ...ltrText,
  },
  labelCompact: {
    fontSize: 12,
    lineHeight: 15,
  },
});
