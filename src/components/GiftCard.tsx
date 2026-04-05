import { StyleSheet, Text, View } from 'react-native';

import { logicalRow, logicalTextBlock, theme } from '../theme';
import { SecondaryButton } from './Buttons';
import { StatusChip } from './StatusChip';
import type { Tone } from '../types/ui';

type GiftCardProps = {
  title: string;
  recipient: string;
  event: string;
  notes?: string;
  statusLabel: string;
  statusTone: Tone;
  onEdit: () => void;
  onMarkPurchased: () => void;
  onSendToShopping: () => void;
};

export function GiftCard({
  title,
  recipient,
  event,
  notes,
  statusLabel,
  statusTone,
  onEdit,
  onMarkPurchased,
  onSendToShopping,
}: GiftCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.meta}>
            עבור {recipient} • {event}
          </Text>
        </View>
        <StatusChip label={statusLabel} tone={statusTone} />
      </View>
      {notes ? <Text style={styles.notes}>{notes}</Text> : null}
      <View style={styles.actions}>
        <SecondaryButton label="עריכה" onPress={onEdit} size="small" />
        <SecondaryButton label="לקניות" onPress={onSendToShopping} size="small" />
        <SecondaryButton label="נקנה" onPress={onMarkPurchased} size="small" />
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
    ...logicalRow,
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
    ...theme.typography.cardTitle,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  meta: {
    ...theme.typography.meta,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
  notes: {
    ...theme.typography.body,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
  actions: {
    ...logicalRow,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
});
