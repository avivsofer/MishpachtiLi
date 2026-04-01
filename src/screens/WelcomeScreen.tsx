import { StyleSheet, Text, View } from 'react-native';

import { AppScreen, PrimaryButton, StatusChip } from '../components';
import { RootScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { pickByDirection, rtlRow, rtlText, theme } from '../theme';

export function WelcomeScreen({ navigation }: RootScreenProps<'Welcome'>) {
  const completeWelcome = useAppStore((state) => state.completeWelcome);

  return (
    <AppScreen scrollable={false}>
      <View style={styles.hero}>
        <View style={styles.heroCard}>
          <StatusChip icon="heart-outline" label="מחובר לבית" tone="accent" />
          <Text style={styles.title}>משפחתילי</Text>
          <Text style={styles.subtitle}>
            מקום אחד חם ונעים לכל מה שחסר בבית, למה שכבר יש, ולדברים הקטנים
            שצריך לזכור יחד.
          </Text>
        </View>
        <View style={styles.featureList}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>קניות שהופכות אוטומטית למלאי</Text>
            <Text style={styles.featureText}>
              מסמנים "נרכש" והפריט עובר ישר ל"יש בבית".
            </Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.miniFeature}>
              <Text style={styles.miniTitle}>רשימות שחוזרות</Text>
              <Text style={styles.miniText}>לשבת, לטיול, לאירוח ולכל מה שחוזר.</Text>
            </View>
            <View style={styles.miniFeature}>
              <Text style={styles.miniTitle}>משימות ומתנות</Text>
              <Text style={styles.miniText}>
                תזכורות קטנות בלי להפוך את הבית לכלי ניהול כבד.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          fullWidth
          icon={pickByDirection('arrow-left', 'arrow-right')}
          iconSide="trailing"
          label="להמשיך"
          onPress={() => {
            completeWelcome();
            navigation.replace('Auth');
          }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: 'space-between',
    gap: theme.spacing.xxl,
  },
  heroCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxxl,
    gap: theme.spacing.lg,
    ...theme.shadow.card,
  },
  title: {
    ...theme.typography.hero,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  featureList: {
    gap: theme.spacing.lg,
  },
  featureCard: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.primarySoft,
    gap: theme.spacing.sm,
  },
  featureTitle: {
    ...theme.typography.cardTitle,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  featureText: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  featureRow: {
    ...rtlRow,
    gap: theme.spacing.md,
  },
  miniFeature: {
    flex: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  miniTitle: {
    ...theme.typography.bodyStrong,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  miniText: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  footer: {
    gap: theme.spacing.md,
  },
});
