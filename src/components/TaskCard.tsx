import { StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlText, theme } from '../theme';
import { SecondaryButton } from './Buttons';
import { StatusChip } from './StatusChip';
import type { Tone } from '../types/ui';

type TaskCardProps = {
  title: string;
  assigneeName: string;
  dueLabel: string;
  statusLabel: string;
  statusTone: Tone;
  onEdit: () => void;
  onToggle: () => void;
};

export function TaskCard({
  title,
  assigneeName,
  dueLabel,
  statusLabel,
  statusTone,
  onEdit,
  onToggle,
}: TaskCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.meta}>
            באחריות {assigneeName} • {dueLabel}
          </Text>
        </View>
        <StatusChip label={statusLabel} tone={statusTone} />
      </View>
      <View style={styles.actions}>
        <SecondaryButton label="עריכה" onPress={onEdit} size="small" />
        <SecondaryButton label="שינוי סטטוס" onPress={onToggle} size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  header: {
    ...rtlRow,
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  copy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.cardTitle,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  meta: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  actions: {
    ...rtlRow,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
});
