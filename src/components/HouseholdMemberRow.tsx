import { StyleSheet, Text, View } from 'react-native';

import { logicalRow, logicalTextBlock, theme } from '../theme';
import { StatusChip } from './StatusChip';
import type { Tone } from '../types/ui';

type HouseholdMemberRowProps = {
  name: string;
  initials: string;
  tint: string;
  role: string;
  roleTone: Tone;
  isCurrentUser?: boolean;
};

export function HouseholdMemberRow({
  name,
  initials,
  tint,
  role,
  roleTone,
  isCurrentUser,
}: HouseholdMemberRowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: tint }]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          {isCurrentUser ? <StatusChip label="אני" tone="primary" /> : null}
        </View>
        <StatusChip label={role} tone={roleTone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    ...logicalRow,
    gap: theme.spacing.md,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...theme.typography.bodyStrong,
    color: theme.colors.textPrimary,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing.sm,
    alignItems: 'stretch',
  },
  titleRow: {
    ...logicalRow,
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  name: {
    ...theme.typography.bodyStrong,
    ...logicalTextBlock,
    flex: 1,
    color: theme.colors.textPrimary,
  },
});
