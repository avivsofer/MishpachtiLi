import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  AppHeader,
  AppScreen,
  EmptyState,
  PrimaryButton,
  QuickAddBar,
  SectionHeader,
} from '../components';
import { AppStackScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { inlineStartAlign, rtlRow, rtlText, theme } from '../theme';
import { formatProgress } from '../utils/formatters';

export function SingleListScreen({
  navigation,
  route,
}: AppStackScreenProps<'SingleList'>) {
  const list = useAppStore((state) =>
    state.customLists.find((entry) => entry.id === route.params.listId),
  );
  const toggleCustomListItem = useAppStore((state) => state.toggleCustomListItem);
  const addCustomListItem = useAppStore((state) => state.addCustomListItem);
  const [newItem, setNewItem] = useState('');

  if (!list) {
    return (
      <AppScreen>
        <AppHeader onBack={() => navigation.goBack()} showBack title="רשימה לא נמצאה" />
        <EmptyState
          actionLabel="לחזור לרשימות"
          description="הרשימה המבוקשת לא זמינה כרגע."
          icon="format-list-checkbox"
          onActionPress={() => navigation.goBack()}
          title="לא הצלחנו לפתוח את הרשימה"
        />
      </AppScreen>
    );
  }

  const doneCount = list.items.filter((item) => item.isDone).length;

  return (
    <AppScreen>
      <AppHeader
        onBack={() => navigation.goBack()}
        showBack
        subtitle={list.subtitle}
        title={list.title}
      />

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>{formatProgress(doneCount, list.items.length)}</Text>
        <Text style={styles.progressText}>
          {doneCount} מתוך {list.items.length} הושלמו
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(doneCount / Math.max(list.items.length, 1)) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader subtitle="כל מה שנשאר לעשות" title="פריטי הרשימה" />
        {list.items.length ? (
          <View style={styles.list}>
            {list.items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => toggleCustomListItem(list.id, item.id)}
                style={({ pressed }) => [styles.itemRow, pressed && styles.itemRowPressed]}
              >
                <Text numberOfLines={2} style={[styles.itemTitle, item.isDone && styles.itemTitleDone]}>
                  {item.title}
                </Text>
                <View style={[styles.checkbox, item.isDone && styles.checkboxDone]}>
                  {item.isDone ? <Text style={styles.checkboxMark}>✓</Text> : null}
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <EmptyState
            actionLabel="להוסיף שורה ראשונה"
            description="אפשר להתחיל עם פריט אחד ולהמשיך לגדול משם."
            icon="playlist-plus"
            onActionPress={() => setNewItem('פריט חדש')}
            title="הרשימה עדיין ריקה"
          />
        )}
      </View>

      <View style={styles.section}>
        <QuickAddBar
          actionLabel="להוסיף לרשימה"
          onChangeText={setNewItem}
          onSubmit={() => {
            addCustomListItem(list.id, newItem);
            setNewItem('');
          }}
          placeholder="מה עוד כדאי להוסיף?"
          value={newItem}
        />
        <PrimaryButton
          fullWidth
          label="סיימתי לעת עתה"
          onPress={() => navigation.goBack()}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  progressTitle: {
    ...theme.typography.title,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  progressText: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceMuted,
    alignItems: inlineStartAlign,
  },
  progressFill: {
    height: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
  },
  section: {
    gap: theme.spacing.lg,
  },
  list: {
    gap: theme.spacing.sm,
  },
  itemRow: {
    ...rtlRow,
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
  },
  itemRowPressed: {
    opacity: 0.94,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundElevated,
  },
  checkboxDone: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkboxMark: {
    color: theme.colors.white,
    fontWeight: '700',
  },
  itemTitle: {
    ...theme.typography.body,
    ...rtlText,
    flex: 1,
    color: theme.colors.textPrimary,
  },
  itemTitleDone: {
    textDecorationLine: 'line-through',
    color: theme.colors.textMuted,
  },
});
