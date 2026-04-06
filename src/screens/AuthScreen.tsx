import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader, AppScreen, PrimaryButton, TextField } from '../components';
import { RootScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { logicalTextBlock, pickByDirection, theme } from '../theme';

export function AuthScreen({ navigation }: RootScreenProps<'Auth'>) {
  const signIn = useAppStore((state) => state.signIn);
  const [displayName, setDisplayName] = useState('אביב');
  const [email, setEmail] = useState('aviv@example.com');

  return (
    <AppScreen scrollable={false}>
      <AppHeader
        subtitle="כניסה מהירה כדי להמשיך להגדיר את הבית."
        title="ברוכים הבאים"
      />
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>כניסה או פתיחת חשבון</Text>
        <Text style={styles.panelText}>
          כרגע זו התחברות מקומית לסקלטון המוצר, עם מבנה שמוכן לחיבור לבקאנד
          בהמשך.
        </Text>
        <TextField
          label="איך יקראו לך בבית?"
          onChangeText={setDisplayName}
          placeholder="שם תצוגה"
          value={displayName}
        />
        <TextField
          autoCapitalize="none"
          autoCorrect={false}
          direction="ltr"
          keyboardType="email-address"
          label="אימייל"
          onChangeText={setEmail}
          placeholder="name@example.com"
          value={email}
        />
      </View>
      <PrimaryButton
        fullWidth
        icon={pickByDirection('arrow-left', 'arrow-right')}
        iconSide="trailing"
        label="להמשיך להגדרת הבית"
        onPress={() => {
          signIn(displayName || email);
          navigation.replace('HouseholdSetup');
        }}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  panelTitle: {
    ...theme.typography.section,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  panelText: {
    ...theme.typography.body,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
});
