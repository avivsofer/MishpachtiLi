import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { logicalRow, logicalText, theme } from '../theme';

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

type ActionButtonBaseProps = Omit<ActionButtonProps, 'tone'> & {
  labelColor: string;
  containerStyle: StyleProp<ViewStyle>;
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

function ActionButtonBase({
  label,
  onPress,
  disabled,
  icon,
  iconSide = 'leading',
  fullWidth,
  size = 'default',
  labelColor,
  containerStyle,
}: ActionButtonBaseProps) {
  const compact = size === 'small';
  const iconSize = compact ? 16 : 18;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        containerStyle,
        compact && styles.baseSmall,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.labelRow}>
        {icon && iconSide === 'leading' ? (
          <MaterialCommunityIcons color={labelColor} name={icon} size={iconSize} />
        ) : null}
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            compact && styles.smallLabel,
            { color: labelColor },
          ]}
        >
          {label}
        </Text>
        {icon && iconSide === 'trailing' ? (
          <MaterialCommunityIcons color={labelColor} name={icon} size={iconSize} />
        ) : null}
      </View>
    </Pressable>
  );
}

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
  return (
    <ActionButtonBase
      containerStyle={{ backgroundColor: primaryToneMap[tone] }}
      disabled={disabled}
      fullWidth={fullWidth}
      icon={icon}
      iconSide={iconSide}
      label={label}
      labelColor={theme.colors.white}
      onPress={onPress}
      size={size}
    />
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
  const colors = secondaryToneMap[tone];

  return (
    <ActionButtonBase
      containerStyle={{
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 1,
      }}
      disabled={disabled}
      fullWidth={fullWidth}
      icon={icon}
      iconSide={iconSide}
      label={label}
      labelColor={colors.color}
      onPress={onPress}
      size={size}
    />
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
  label: {
    ...theme.typography.button,
    ...logicalText,
    flexShrink: 1,
  },
  smallLabel: {
    fontSize: 14,
    lineHeight: 18,
  },
  labelRow: {
    ...logicalRow,
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
