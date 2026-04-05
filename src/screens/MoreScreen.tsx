import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader, AppScreen, SectionHeader, StatusChip } from '../components';
import { AppTabScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { logicalRow, logicalTextBlock, pickByDirection, theme } from '../theme';

const entries = [
  {
    key: 'Gifts',
    title: 'מתנות',
    subtitle: 'רעיונות ומתנות קטנות לאירועים קרובים',
    icon: 'gift-outline',
  },
  {
    key: 'Tasks',
    title: 'משימות',
    subtitle: 'מה עוד צריך לקרות בבית',
    icon: 'check-decagram-outline',
  },
  {
    key: 'HouseholdMembers',
    title: 'בני הבית',
    subtitle: 'מי כבר איתכם ואיך מצרפים עוד',
    icon: 'account-group-outline',
  },
  {
    key: 'Settings',
    title: 'הגדרות',
    subtitle: 'שם הבית, פרופיל והתנתקות',
    icon: 'cog-outline',
  },
] as const;

export function MoreScreen({ navigation }: AppTabScreenProps<'More'>) {
  const household = useAppStore((state) => state.household);

  return (
    <AppScreen>
      <AppHeader subtitle="הדברים שתומכים בבית המשותף שלכם" title="עוד" />

      <View style={styles.inviteCard}>
        <View style={styles.inviteTop}>
          <View style={styles.inviteCopy}>
            <Text style={styles.inviteTitle}>לצרף עוד בן בית</Text>
            <Text style={styles.inviteText}>
              זה הקוד שאפשר לשתף כדי להצטרף לאותו בית משותף בלי להתחיל מחדש.
            </Text>
          </View>
          <StatusChip direction="ltr" label={household.inviteCode} tone="primary" />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          subtitle="כל מה שעוזר לבית להתנהל יחד בלי להעמיס על המסכים הראשיים"
          title="אפשר להמשיך מכאן"
        />
        <View style={styles.list}>
          {entries.map((entry) => (
            <Pressable
              key={entry.key}
              onPress={() => navigation.navigate(entry.key)}
              style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            >
              <MaterialCommunityIcons
                color={theme.colors.primary}
                name={entry.icon}
                size={22}
              />
              <View style={styles.copy}>
                <Text numberOfLines={1} style={styles.title}>
                  {entry.title}
                </Text>
                <Text numberOfLines={2} style={styles.subtitle}>
                  {entry.subtitle}
                </Text>
              </View>
              <MaterialCommunityIcons
                color={theme.colors.textMuted}
                name={pickByDirection('chevron-left', 'chevron-right')}
                size={22}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  inviteCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
  },
  inviteTop: {
    ...logicalRow,
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
  },
  inviteCopy: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing.sm,
    alignItems: 'stretch',
  },
  inviteTitle: {
    ...theme.typography.section,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  inviteText: {
    ...theme.typography.body,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
  section: {
    gap: theme.spacing.lg,
  },
  list: {
    gap: theme.spacing.md,
  },
  row: {
    ...logicalRow,
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
  },
  rowPressed: {
    opacity: 0.94,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing.xs,
    alignItems: 'stretch',
  },
  title: {
    ...theme.typography.bodyStrong,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.meta,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
});
