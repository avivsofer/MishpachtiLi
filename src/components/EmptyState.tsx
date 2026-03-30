import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { rtlText, theme } from '../theme';
import { PrimaryButton } from './Buttons';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type EmptyStateProps = {
  icon: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          color={theme.colors.primary}
          name={icon}
          size={30}
        />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {actionLabel && onActionPress ? (
        <PrimaryButton label={actionLabel} onPress={onActionPress} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xxxl,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySoft,
  },
  textBlock: {
    gap: theme.spacing.sm,
    alignSelf: 'stretch',
  },
  title: {
    ...theme.typography.section,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  description: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
