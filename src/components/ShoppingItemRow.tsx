import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlText, theme } from '../theme';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { StatusChip } from './StatusChip';

type ShoppingItemRowProps = {
  name: string;
  quantityLabel?: string;
  addedByName: string;
  note?: string;
  onMarkPurchased: () => void;
  onRemove: () => void;
};

export function ShoppingItemRow({
  name,
  quantityLabel,
  addedByName,
  note,
  onMarkPurchased,
  onRemove,
}: ShoppingItemRowProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.copy}>
          <View style={styles.titleRow}>
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            {quantityLabel ? (
              <StatusChip
                icon="scale-balance"
                label={quantityLabel}
                size="sm"
                tone="neutral"
              />
            ) : null}
          </View>
          <View style={styles.metaRow}>
            <StatusChip
              icon="account-outline"
              label={`נוסף על ידי ${addedByName}`}
              size="sm"
              tone="neutral"
            />
          </View>
        </View>
        <Pressable
          onPress={onMarkPurchased}
          style={({ pressed }) => [styles.checkButton, pressed && styles.checkButtonPressed]}
        >
          <MaterialCommunityIcons
            color={theme.colors.success}
            name="check"
            size={20}
          />
        </Pressable>
      </View>

      {note ? (
        <View style={styles.noteBox}>
          <MaterialCommunityIcons
            color={theme.colors.textMuted}
            name="note-text-outline"
            size={16}
          />
          <Text numberOfLines={2} style={styles.note}>
            {note}
          </Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        <View style={styles.purchaseAction}>
          <PrimaryButton
            fullWidth
            icon="check-bold"
            label="סימון כנרכש"
            onPress={onMarkPurchased}
            size="small"
            tone="success"
          />
        </View>
        <View style={styles.removeAction}>
          <SecondaryButton
            icon="trash-can-outline"
            label="להסיר"
            onPress={onRemove}
            size="small"
            tone="neutral"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    ...theme.shadow.soft,
  },
  topRow: {
    ...rtlRow,
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  copy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  titleRow: {
    ...rtlRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  name: {
    ...theme.typography.cardTitle,
    ...rtlText,
    flex: 1,
    color: theme.colors.textPrimary,
  },
  metaRow: {
    ...rtlRow,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  checkButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.successSoft,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
  },
  checkButtonPressed: {
    opacity: 0.92,
  },
  noteBox: {
    ...rtlRow,
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceWarm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  note: {
    ...theme.typography.meta,
    ...rtlText,
    flex: 1,
    color: theme.colors.textSecondary,
  },
  footer: {
    ...rtlRow,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  removeAction: {
    width: 110,
  },
  purchaseAction: {
    flex: 1,
  },
});
