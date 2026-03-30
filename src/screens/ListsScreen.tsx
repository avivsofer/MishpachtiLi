import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppHeader,
  AppScreen,
  EmptyState,
  ListCard,
  ModalSheet,
  PrimaryButton,
  SectionHeader,
  TextField,
} from '../components';
import { AppTabScreenProps } from '../navigation/types';
import { selectCustomLists } from '../store/selectors';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme';
import { formatProgress } from '../utils/formatters';

export function ListsScreen({ navigation }: AppTabScreenProps<'Lists'>) {
  const customLists = useAppStore(selectCustomLists);
  const createCustomList = useAppStore((state) => state.createCustomList);
  const useTemplateList = useAppStore((state) => state.useTemplateList);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [title, setTitle] = useState('');

  const templates = useMemo(
    () => customLists.filter((list) => list.kind === 'template'),
    [customLists],
  );

  const activeLists = useMemo(
    () => customLists.filter((list) => list.kind === 'active'),
    [customLists],
  );

  return (
    <AppScreen>
      <AppHeader
        subtitle="רשימות מוכנות ורשימות חיות שחוסכות זמן בבית"
        title="רשימות"
        trailing={
          <PrimaryButton
            label="רשימה חדשה"
            onPress={() => setSheetOpen(true)}
            size="small"
          />
        }
      />

      <View style={styles.section}>
        <SectionHeader
          subtitle="הרשימות שכבר עוזרות לבית עכשיו"
          title="בשימוש בבית"
        />
        {activeLists.length ? (
          <View style={styles.list}>
            {activeLists.map((list) => {
              const doneCount = list.items.filter((item) => item.isDone).length;

              return (
                <ListCard
                  key={list.id}
                  onPress={() => navigation.navigate('SingleList', { listId: list.id })}
                  progressLabel={`${formatProgress(doneCount, list.items.length)} הושלם`}
                  progressValue={doneCount / Math.max(list.items.length, 1)}
                  subtitle={list.subtitle}
                  title={list.title}
                  tone={list.accentTone}
                />
              );
            })}
          </View>
        ) : (
          <EmptyState
            actionLabel="ליצור רשימה"
            description="אפשר להתחיל מרשימה חופשית, או לבחור תבנית שמכינה את הבית מהר."
            icon="format-list-checkbox"
            onActionPress={() => setSheetOpen(true)}
            title="עוד אין רשימות קבועות לבית"
          />
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader
          subtitle="רשימות מוכנות למצבים שחוזרים שוב ושוב במשפחה"
          title="להתחיל מהר"
        />
        <View style={styles.list}>
          {templates.map((list) => {
            const doneCount = list.items.filter((item) => item.isDone).length;

            return (
              <ListCard
                ctaLabel="להשתמש ברשימה הזאת"
                key={list.id}
                onCtaPress={() => useTemplateList(list.id)}
                progressLabel={`${list.items.length} פריטים מוכנים`}
                progressValue={doneCount / Math.max(list.items.length, 1)}
                subtitle={list.subtitle}
                title={list.title}
                tone={list.accentTone}
              />
            );
          })}
        </View>
      </View>

      <ModalSheet
        onClose={() => {
          setSheetOpen(false);
          setTitle('');
        }}
        subtitle="רשימה חופשית לדברים שחוזרים בבית."
        title="רשימה חדשה"
        visible={sheetOpen}
      >
        <TextField
          label="כותרת הרשימה"
          onChangeText={setTitle}
          placeholder="למשל: אירוח בשישי"
          value={title}
        />
        <PrimaryButton
          fullWidth
          label="ליצור רשימה"
          onPress={() => {
            createCustomList(title);
            setSheetOpen(false);
            setTitle('');
          }}
        />
      </ModalSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.lg,
  },
  list: {
    gap: theme.spacing.md,
  },
});
