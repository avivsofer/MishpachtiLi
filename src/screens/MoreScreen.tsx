import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader, AppScreen, SectionHeader, StatusChip } from '../components';
import { AppTabScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { rtlRow, rtlText, theme } from '../theme';

const entries = [
  {
    key: 'Gifts',
    title: 'מתנות',
    subtitle: 'רעיונות וקניות קטנות לאירועים',
    icon: 'gift-outline',
  },
  {
    key: 'Tasks',
    title: 'משימות',
    subtitle: 'מה עוד פתוח בבית',
    icon: 'check-decagram-outline',
  },
  {
    key: 'HouseholdMembers',
    title: 'בני הבית',
    subtitle: 'מי בפנים ואיך מזמינים עוד',
    icon: 'account-group-outline',
  },
  {
    key: 'Settings',
    title: 'הגדרות',
    subtitle: 'פרופיל, שם הבית והתנתקות',
    icon: 'cog-outline',
  },
] as const;

export function MoreScreen({ navigation }: AppTabScreenProps<'More'>) {
  const household = useAppStore((state) => state.household);

  return (
    <AppScreen>
      <AppHeader subtitle="כל מה שמסביב לניהול הבית" title="עוד" />

      <View style={styles.inviteCard}>
        <View style={styles.inviteTop}>
          <View style={styles.inviteCopy}>
            <Text style={styles.inviteTitle}>להזמין עוד בני בית</Text>
            <Text style={styles.inviteText}>
              קוד המשפחה שלכם מוכן לשיתוף כשיהיה חיבור מלא להזמנות.
            </Text>
          </View>
          <StatusChip direction="ltr" label={household.inviteCode} tone="primary" />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          subtitle="מסכים משלימים למוצר"
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
                name="chevron-left"
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
    ...rtlRow,
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
  },
  inviteCopy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  inviteTitle: {
    ...theme.typography.section,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  inviteText: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  section: {
    gap: theme.spacing.lg,
  },
  list: {
    gap: theme.spacing.md,
  },
  row: {
    ...rtlRow,
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
    gap: theme.spacing.xs,
  },
  title: {
    ...theme.typography.bodyStrong,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
