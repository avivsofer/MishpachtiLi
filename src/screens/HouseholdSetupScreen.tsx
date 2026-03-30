import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  AppHeader,
  AppScreen,
  ChoiceChip,
  PrimaryButton,
  TextField,
} from '../components';
import { RootScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { ltrText, rtlRow, rtlText, theme } from '../theme';

export function HouseholdSetupScreen({
  navigation,
}: RootScreenProps<'HouseholdSetup'>) {
  const household = useAppStore((state) => state.household);
  const setupHousehold = useAppStore((state) => state.setupHousehold);
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [householdName, setHouseholdName] = useState('משפחתילי בבית');
  const [inviteCode, setInviteCode] = useState(household.inviteCode);

  return (
    <AppScreen scrollable={false}>
      <AppHeader
        subtitle="אפשר לפתוח בית חדש או להצטרף לבית משפחתי קיים."
        title="הגדרת הבית"
      />
      <View style={styles.modeRow}>
        <ChoiceChip
          label="ליצור בית"
          onPress={() => setMode('create')}
          selected={mode === 'create'}
        />
        <ChoiceChip
          label="להצטרף עם קוד"
          onPress={() => setMode('join')}
          selected={mode === 'join'}
        />
      </View>
      {mode === 'create' ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>בית חדש למשפחה</Text>
          <Text style={styles.cardText}>
            מתחילים בשם נעים לבית. אחר כך אפשר להזמין בני בית ולהתחיל לבנות
            רשימות ומלאי משותף.
          </Text>
          <TextField
            label="שם הבית"
            onChangeText={setHouseholdName}
            placeholder="למשל: משפחתילי בבית"
            value={householdName}
          />
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>הצטרפות לבית קיים</Text>
          <Text style={styles.cardText}>
            הכניסו קוד הזמנה והמשיכו ישר למסכים הראשיים. כרגע החיבור הוא מקומי
            לצורך השלד.
          </Text>
          <TextField
            autoCapitalize="characters"
            autoCorrect={false}
            direction="ltr"
            label="קוד הזמנה"
            onChangeText={setInviteCode}
            placeholder="MISHP-2481"
            value={inviteCode}
          />
        </View>
      )}
      <View style={styles.inviteCard}>
        <Text style={styles.inviteLabel}>דוגמת קוד למשפחה</Text>
        <Text style={styles.inviteCode}>{household.inviteCode}</Text>
      </View>
      <PrimaryButton
        fullWidth
        icon="home-plus-outline"
        label={mode === 'create' ? 'ליצור את הבית' : 'להצטרף ולהמשיך'}
        onPress={() => {
          setupHousehold({
            mode,
            householdName,
            inviteCode,
          });
          navigation.reset({
            index: 0,
            routes: [{ name: 'App' }],
          });
        }}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  modeRow: {
    ...rtlRow,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  cardTitle: {
    ...theme.typography.section,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  cardText: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  inviteCard: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  inviteLabel: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.primary,
  },
  inviteCode: {
    ...theme.typography.section,
    ...ltrText,
    textAlign: 'center',
    color: theme.colors.textPrimary,
  },
});
