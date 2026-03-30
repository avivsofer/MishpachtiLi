import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  AppHeader,
  AppScreen,
  HouseholdMemberRow,
  ModalSheet,
  PrimaryButton,
  SectionHeader,
  TextField,
  ChoiceChip,
} from '../components';
import { AppStackScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { ltrText, rtlRow, rtlText, theme } from '../theme';
import { memberRoleTone } from '../utils/status';

export function HouseholdMembersScreen({
  navigation,
}: AppStackScreenProps<'HouseholdMembers'>) {
  const household = useAppStore((state) => state.household);
  const members = useAppStore((state) => state.members);
  const addMember = useAppStore((state) => state.addMember);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'הורה' | 'ילד' | 'אורח'>('אורח');

  return (
    <AppScreen>
      <AppHeader
        onBack={() => navigation.goBack()}
        showBack
        subtitle="מי שותף בניהול הבית"
        title="בני הבית"
        trailing={
          <PrimaryButton label="להזמין" onPress={() => setSheetOpen(true)} size="small" />
        }
      />

      <View style={styles.inviteCard}>
        <Text style={styles.inviteTitle}>קוד הזמנה</Text>
        <Text style={styles.inviteCode}>{household.inviteCode}</Text>
        <Text style={styles.inviteText}>
          בקוד זה ישתמשו בני בית נוספים אחרי חיבור מלא לשיתוף והזמנות.
        </Text>
      </View>

      <View style={styles.section}>
        <SectionHeader subtitle="כל מי שכבר בפנים" title="חברי הבית" />
        <View style={styles.list}>
          {members.map((member) => (
            <HouseholdMemberRow
              initials={member.initials}
              isCurrentUser={member.isCurrentUser}
              key={member.id}
              name={member.name}
              role={member.role}
              roleTone={memberRoleTone[member.role]}
              tint={member.tint}
            />
          ))}
        </View>
      </View>

      <ModalSheet
        onClose={() => {
          setSheetOpen(false);
          setName('');
          setRole('אורח');
        }}
        subtitle="כרגע ההזמנה מקומית ונשמרת כחבר בית חדש."
        title="הוספת בן בית"
        visible={sheetOpen}
      >
        <TextField
          label="שם"
          onChangeText={setName}
          placeholder="למשל: שירה"
          value={name}
        />
        <View style={styles.roleRow}>
          <ChoiceChip label="הורה" onPress={() => setRole('הורה')} selected={role === 'הורה'} />
          <ChoiceChip label="ילד" onPress={() => setRole('ילד')} selected={role === 'ילד'} />
          <ChoiceChip label="אורח" onPress={() => setRole('אורח')} selected={role === 'אורח'} />
        </View>
        <PrimaryButton
          fullWidth
          label="להוסיף לבית"
          onPress={() => {
            addMember({ name, role });
            setSheetOpen(false);
            setName('');
            setRole('אורח');
          }}
        />
      </ModalSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  inviteCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
  inviteTitle: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.primary,
  },
  inviteCode: {
    ...theme.typography.title,
    ...ltrText,
    textAlign: 'center',
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
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.xl,
  },
  roleRow: {
    ...rtlRow,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
});
