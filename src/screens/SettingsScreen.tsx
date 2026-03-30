import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Application from 'expo-application';

import {
  AppHeader,
  AppScreen,
  ConfirmationDialog,
  PrimaryButton,
  SectionHeader,
  TextField,
} from '../components';
import { AppStackScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { ltrText, rtlText, theme } from '../theme';

export function SettingsScreen({ navigation }: AppStackScreenProps<'Settings'>) {
  const household = useAppStore((state) => state.household);
  const session = useAppStore((state) => state.session);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const logout = useAppStore((state) => state.logout);
  const [householdName, setHouseholdName] = useState(household.name);
  const [displayName, setDisplayName] = useState(session.displayName);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <AppScreen>
      <AppHeader
        onBack={() => navigation.goBack()}
        showBack
        subtitle="פרטי הבית והפרופיל"
        title="הגדרות"
      />

      <View style={styles.section}>
        <SectionHeader subtitle="מה רואים כולם" title="פרטי הבית" />
        <View style={styles.card}>
          <TextField
            label="שם הבית"
            onChangeText={setHouseholdName}
            placeholder="שם הבית"
            value={householdName}
          />
          <Text style={styles.metaText}>
            קוד הזמנה:{' '}
            <Text style={styles.inlineLtr}>{household.inviteCode}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader subtitle="איך מזהים אותך באפליקציה" title="פרופיל" />
        <View style={styles.card}>
          <TextField
            label="שם תצוגה"
            onChangeText={setDisplayName}
            placeholder="שם תצוגה"
            value={displayName}
          />
          <Text style={styles.metaText}>
            גרסת אפליקציה:{' '}
            <Text style={styles.inlineLtr}>
              {Application.nativeApplicationVersion ?? '1.0.0'}
            </Text>
          </Text>
        </View>
      </View>

      <PrimaryButton
        fullWidth
        label="לשמור שינויים"
        onPress={() =>
          updateProfile({
            displayName,
            householdName,
          })
        }
      />

      <PrimaryButton
        fullWidth
        icon="logout"
        label="להתנתק"
        onPress={() => setLogoutOpen(true)}
      />

      <ConfirmationDialog
        confirmLabel="להתנתק"
        description="הסשן המקומי ייסגר ותחזרו למסך הפתיחה."
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => {
          logout();
          setLogoutOpen(false);
          navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: 'Welcome' as never }],
          });
        }}
        title="להתנתק מהחשבון?"
        visible={logoutOpen}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.lg,
  },
  card: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  metaText: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  inlineLtr: {
    ...ltrText,
    color: theme.colors.textPrimary,
  },
});
