import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { rtlRow, rtlTextBlock, theme } from '../theme';
import { SecondaryButton } from './Buttons';
import { StatusChip } from './StatusChip';
import type { Tone } from '../types/ui';

type InventoryVariant = 'inStock' | 'lowStock' | 'outOfStock';

type InventoryItemCardProps = {
  name: string;
  category: string;
  quantityLabel?: string;
  note?: string;
  statusLabel: string;
  statusTone: Tone;
  variant: InventoryVariant;
  statusHint: string;
  onMarkInStock: () => void;
  onMarkLow: () => void;
  onMarkOut: () => void;
  onAddToShopping: () => void;
  onEdit: () => void;
  onArchive: () => void;
};

const toneMap: Record<
  InventoryVariant,
  { rail: string; surface: string; border: string; icon: string }
> = {
  inStock: {
    rail: theme.colors.success,
    surface: '#FCFDFC',
    border: theme.colors.successBorder,
    icon: theme.colors.success,
  },
  lowStock: {
    rail: theme.colors.warning,
    surface: '#FFFCF7',
    border: theme.colors.warningBorder,
    icon: theme.colors.warning,
  },
  outOfStock: {
    rail: theme.colors.danger,
    surface: '#FFF9F8',
    border: theme.colors.dangerBorder,
    icon: theme.colors.danger,
  },
};

export function InventoryItemCard({
  name,
  category,
  quantityLabel,
  note,
  statusLabel,
  statusTone,
  variant,
  statusHint,
  onMarkInStock,
  onMarkLow,
  onMarkOut,
  onAddToShopping,
  onEdit,
  onArchive,
}: InventoryItemCardProps) {
  const colors = toneMap[variant];
  const metaText = quantityLabel ? `${category} · ${quantityLabel}` : category;

  const primaryAction =
    variant === 'outOfStock'
      ? {
          label: 'לטפל עכשיו',
          tone: 'danger' as const,
          icon: 'alert-circle-outline' as const,
          onPress: onMarkOut,
        }
      : {
          label: 'להוסיף לקניות',
          tone: variant === 'lowStock' ? ('warning' as const) : ('primary' as const),
          icon: 'cart-plus' as const,
          onPress: onAddToShopping,
        };

  const secondaryAction =
    variant === 'inStock'
      ? {
          label: 'כמעט נגמר',
          tone: 'warning' as const,
          icon: 'water-outline' as const,
          onPress: onMarkLow,
        }
      : {
          label: 'יש בבית',
          tone: 'success' as const,
          icon: 'check-circle-outline' as const,
          onPress: onMarkInStock,
        };

  const tertiaryAction =
    variant === 'outOfStock'
      ? {
          label: 'להסיר',
          tone: 'danger' as const,
          icon: 'trash-can-outline' as const,
          onPress: onArchive,
        }
      : {
          label: 'נגמר',
          tone: 'danger' as const,
          icon: 'close-circle-outline' as const,
          onPress: onMarkOut,
        };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={[styles.rail, { backgroundColor: colors.rail }]} />

      <View style={styles.header}>
        <View style={styles.copy}>
          <View style={styles.titleRow}>
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            <StatusChip label={statusLabel} tone={statusTone} />
          </View>
          <Text numberOfLines={1} style={styles.metaText}>
            {metaText}
          </Text>
        </View>
        <View style={styles.headerButtons}>
          <Pressable
            onPress={onEdit}
            style={({ pressed }) => [styles.editButton, pressed && styles.iconButtonPressed]}
          >
            <MaterialCommunityIcons
              color={theme.colors.textSecondary}
              name="pencil-outline"
              size={18}
            />
          </Pressable>
          <Pressable
            onPress={onArchive}
            style={({ pressed }) => [
              styles.archiveButton,
              pressed && styles.iconButtonPressed,
            ]}
          >
            <MaterialCommunityIcons
              color={theme.colors.danger}
              name="trash-can-outline"
              size={17}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.statusDot, { backgroundColor: colors.icon }]} />
        <Text numberOfLines={3} style={styles.statusHint}>
          {statusHint}
        </Text>
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

      <View style={styles.actions}>
        <SecondaryButton
          fullWidth
          icon={primaryAction.icon}
          label={primaryAction.label}
          onPress={primaryAction.onPress}
          size="small"
          tone={primaryAction.tone}
        />
        <View style={styles.actionRow}>
          <View style={styles.actionHalf}>
            <SecondaryButton
              fullWidth
              icon={secondaryAction.icon}
              label={secondaryAction.label}
              onPress={secondaryAction.onPress}
              size="small"
              tone={secondaryAction.tone}
            />
          </View>
          <View style={styles.actionHalf}>
            <SecondaryButton
              fullWidth
              icon={tertiaryAction.icon}
              label={tertiaryAction.label}
              onPress={tertiaryAction.onPress}
              size="small"
              tone={tertiaryAction.tone}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    overflow: 'hidden',
    ...theme.shadow.soft,
  },
  rail: {
    position: 'absolute',
    right: 0,
    top: 14,
    bottom: 14,
    width: 4,
    borderRadius: 999,
  },
  header: {
    ...rtlRow,
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  },
  copy: {
    flex: 1,
    gap: theme.spacing.sm,
    alignItems: 'stretch',
  },
  titleRow: {
    ...rtlRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  metaText: {
    ...theme.typography.meta,
    ...rtlTextBlock,
    color: theme.colors.textSecondary,
  },
  editButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  archiveButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
  },
  iconButtonPressed: {
    opacity: 0.9,
  },
  headerButtons: {
    ...rtlRow,
    gap: theme.spacing.sm,
  },
  name: {
    ...theme.typography.cardTitle,
    ...rtlTextBlock,
    flex: 1,
    color: theme.colors.textPrimary,
  },
  statusRow: {
    ...rtlRow,
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  statusHint: {
    ...theme.typography.meta,
    ...rtlTextBlock,
    flex: 1,
    color: theme.colors.textSecondary,
  },
  noteBox: {
    ...rtlRow,
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  note: {
    ...theme.typography.meta,
    ...rtlTextBlock,
    flex: 1,
    color: theme.colors.textSecondary,
  },
  actions: {
    gap: theme.spacing.sm,
  },
  actionRow: {
    ...rtlRow,
    gap: theme.spacing.sm,
  },
  actionHalf: {
    flex: 1,
  },
});
