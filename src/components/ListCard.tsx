import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { inlineStartAlign, pickByDirection, rtlRow, rtlText, theme } from '../theme';
import { PrimaryButton, SecondaryButton } from './Buttons';

type ListCardProps = {
  title: string;
  subtitle: string;
  progressValue: number;
  progressLabel: string;
  tone: 'primary' | 'accent' | 'success';
  ctaLabel?: string;
  onPress?: () => void;
  onCtaPress?: () => void;
};

const toneColor = {
  primary: theme.colors.primary,
  accent: theme.colors.accent,
  success: theme.colors.success,
} as const;

export function ListCard({
  title,
  subtitle,
  progressValue,
  progressLabel,
  tone,
  ctaLabel,
  onPress,
  onCtaPress,
}: ListCardProps) {
  const content = (
    <>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {onPress ? (
            <MaterialCommunityIcons
              color={theme.colors.textMuted}
              name={pickByDirection('chevron-left', 'chevron-right')}
              size={18}
            />
          ) : null}
        </View>
        <Text numberOfLines={2} style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.progressBlock}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.max(6, Math.min(progressValue * 100, 100))}%`,
                backgroundColor: toneColor[tone],
              },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>{progressLabel}</Text>
      </View>
      {ctaLabel && onCtaPress ? (
        tone === 'primary' ? (
          <PrimaryButton label={ctaLabel} onPress={onCtaPress} size="small" />
        ) : (
          <SecondaryButton label={ctaLabel} onPress={onCtaPress} size="small" />
        )
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        {content}
      </Pressable>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  cardPressed: {
    opacity: 0.96,
  },
  header: {
    gap: theme.spacing.xs,
  },
  titleRow: {
    ...rtlRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  title: {
    flex: 1,
    ...theme.typography.cardTitle,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  progressBlock: {
    gap: theme.spacing.sm,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceMuted,
    overflow: 'hidden',
    alignItems: inlineStartAlign,
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
  },
  progressLabel: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
