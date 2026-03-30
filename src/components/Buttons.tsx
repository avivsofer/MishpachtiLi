import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlText, theme } from '../theme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
type ButtonSize = 'default' | 'small';
type ButtonTone = 'primary' | 'accent' | 'success' | 'danger';
type SecondaryTone = ButtonTone | 'neutral' | 'warning';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: IconName;
  iconSide?: 'leading' | 'trailing';
  fullWidth?: boolean;
  size?: ButtonSize;
  tone?: ButtonTone;
};

const primaryToneMap: Record<ButtonTone, string> = {
  primary: theme.colors.primary,
  accent: theme.colors.accent,
  success: theme.colors.success,
  danger: theme.colors.danger,
};

const secondaryToneMap: Record<
  SecondaryTone,
  { backgroundColor: string; borderColor: string; color: string }
> = {
  neutral: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    color: theme.colors.textPrimary,
  },
  primary: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primaryBorder,
    color: theme.colors.primary,
  },
  accent: {
    backgroundColor: theme.colors.accentSoft,
    borderColor: theme.colors.accentBorder,
    color: theme.colors.accent,
  },
  success: {
    backgroundColor: theme.colors.successSoft,
    borderColor: theme.colors.successBorder,
    color: theme.colors.success,
  },
  warning: {
    backgroundColor: theme.colors.warningSoft,
    borderColor: theme.colors.warningBorder,
    color: theme.colors.warning,
  },
  danger: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: theme.colors.dangerBorder,
    color: theme.colors.danger,
  },
};

export function PrimaryButton({
  label,
  onPress,
  disabled,
  icon,
  iconSide = 'leading',
  fullWidth,
  size = 'default',
  tone = 'primary',
}: ActionButtonProps) {
  const compact = size === 'small';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: primaryToneMap[tone] },
        compact && styles.baseSmall,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.labelRow}>
        {icon && iconSide === 'leading' ? (
          <MaterialCommunityIcons
            color={theme.colors.white}
            name={icon}
            size={compact ? 16 : 18}
          />
        ) : null}
        <Text numberOfLines={1} style={[styles.primaryLabel, compact && styles.smallLabel]}>
          {label}
        </Text>
        {icon && iconSide === 'trailing' ? (
          <MaterialCommunityIcons
            color={theme.colors.white}
            name={icon}
            size={compact ? 16 : 18}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  disabled,
  icon,
  iconSide = 'leading',
  fullWidth,
  size = 'default',
  tone = 'neutral',
}: Omit<ActionButtonProps, 'tone'> & { tone?: SecondaryTone }) {
  const compact = size === 'small';
  const colors = secondaryToneMap[tone];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 1,
        },
        compact && styles.baseSmall,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.labelRow}>
        {icon && iconSide === 'leading' ? (
          <MaterialCommunityIcons
            color={colors.color}
            name={icon}
            size={compact ? 16 : 18}
          />
        ) : null}
        <Text
          numberOfLines={1}
          style={[
            styles.secondaryLabel,
            compact && styles.smallLabel,
            { color: colors.color },
          ]}
        >
          {label}
        </Text>
        {icon && iconSide === 'trailing' ? (
          <MaterialCommunityIcons
            color={colors.color}
            name={icon}
            size={compact ? 16 : 18}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

type IconButtonProps = {
  icon: IconName;
  onPress: () => void;
  tone?: 'neutral' | 'accent' | 'danger';
};

export function IconButton({
  icon,
  onPress,
  tone = 'neutral',
}: IconButtonProps) {
  const toneStyle =
    tone === 'accent'
      ? styles.iconAccent
      : tone === 'danger'
        ? styles.iconDanger
        : styles.iconNeutral;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, toneStyle, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons
        color={
          tone === 'accent'
            ? theme.colors.accent
            : tone === 'danger'
              ? theme.colors.danger
              : theme.colors.textPrimary
        }
        name={icon}
        size={18}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: theme.layout.touchTarget,
    borderRadius: theme.radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  baseSmall: {
    minHeight: 38,
    paddingHorizontal: theme.spacing.lg,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  primaryLabel: {
    ...theme.typography.button,
    ...rtlText,
    color: theme.colors.white,
  },
  secondaryLabel: {
    ...theme.typography.button,
    ...rtlText,
  },
  smallLabel: {
    fontSize: 14,
    lineHeight: 18,
  },
  labelRow: {
    ...rtlRow,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.45,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconNeutral: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  iconAccent: {
    backgroundColor: theme.colors.accentSoft,
  },
  iconDanger: {
    backgroundColor: theme.colors.dangerSoft,
  },
});
