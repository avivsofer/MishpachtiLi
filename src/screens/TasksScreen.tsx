import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppHeader,
  AppScreen,
  ChoiceChip,
  EmptyState,
  ModalSheet,
  PrimaryButton,
  TaskCard,
  TextField,
} from '../components';
import { AppStackScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { rtlRow, theme } from '../theme';
import { formatDueDate } from '../utils/formatters';
import { taskStatusMeta } from '../utils/status';

type TaskFilter = 'all' | 'open' | 'completed';

export function TasksScreen({ navigation }: AppStackScreenProps<'Tasks'>) {
  const members = useAppStore((state) => state.members);
  const tasks = useAppStore((state) => state.tasks);
  const saveTask = useAppStore((state) => state.saveTask);
  const toggleTaskStatus = useAppStore((state) => state.toggleTaskStatus);
  const [filter, setFilter] = useState<TaskFilter>('open');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedMemberId, setAssignedMemberId] = useState(members[0]?.id ?? '');

  const visibleTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter,
  );

  const editingTask = tasks.find((task) => task.id === editingId) ?? null;

  const closeEditor = () => {
    setSheetOpen(false);
    setEditingId(null);
    setTitle('');
    setDueDate('');
    setAssignedMemberId(members[0]?.id ?? '');
  };

  const openEditor = (taskId?: string) => {
    setSheetOpen(true);

    if (!taskId) {
      setEditingId(null);
      setTitle('');
      setDueDate('');
      setAssignedMemberId(members[0]?.id ?? '');
      return;
    }

    const task = tasks.find((entry) => entry.id === taskId);

    if (!task) {
      return;
    }

    setEditingId(task.id);
    setTitle(task.title);
    setDueDate(task.dueDate ?? '');
    setAssignedMemberId(task.assignedMemberId);
  };

  return (
    <AppScreen>
      <AppHeader
        onBack={() => navigation.goBack()}
        showBack
        subtitle="משימות פשוטות וברורות לבית"
        title="משימות"
        trailing={
          <PrimaryButton label="משימה חדשה" onPress={() => openEditor()} size="small" />
        }
      />

      <View style={styles.filterRow}>
        <ChoiceChip label="פתוחות" onPress={() => setFilter('open')} selected={filter === 'open'} />
        <ChoiceChip
          label="הושלמו"
          onPress={() => setFilter('completed')}
          selected={filter === 'completed'}
        />
        <ChoiceChip label="הכל" onPress={() => setFilter('all')} selected={filter === 'all'} />
      </View>

      {visibleTasks.length ? (
        <View style={styles.list}>
          {visibleTasks.map((task) => {
            const meta = taskStatusMeta[task.status];
            const assigneeName =
              members.find((member) => member.id === task.assignedMemberId)?.name ??
              'בן בית';

            return (
              <TaskCard
                assigneeName={assigneeName}
                dueLabel={formatDueDate(task.dueDate)}
                key={task.id}
                onEdit={() => openEditor(task.id)}
                onToggle={() => toggleTaskStatus(task.id)}
                statusLabel={meta.label}
                statusTone={meta.tone}
                title={task.title}
              />
            );
          })}
        </View>
      ) : (
        <EmptyState
          actionLabel="להוסיף משימה"
          description="המשימות כאן נשארות קלילות: רק מה שצריך כדי שהבית יזרום."
          icon="check-decagram-outline"
          onActionPress={() => openEditor()}
          title="אין משימות בתצוגה הזו"
        />
      )}

      <ModalSheet
        onClose={closeEditor}
        subtitle={editingTask ? 'עדכון משימה פתוחה' : 'משימה ביתית קצרה וברורה'}
        title={editingTask ? 'עריכת משימה' : 'משימה חדשה'}
        visible={sheetOpen}
      >
        <TextField
          label="כותרת"
          onChangeText={setTitle}
          placeholder="למשל: לקחת חבילה"
          value={title}
        />
        <TextField
          direction="ltr"
          label="תאריך יעד"
          onChangeText={setDueDate}
          placeholder="2026-03-30T18:00:00+03:00"
          value={dueDate}
        />
        <View style={styles.filterRow}>
          {members.map((member) => (
            <ChoiceChip
              key={member.id}
              label={member.name}
              onPress={() => setAssignedMemberId(member.id)}
              selected={assignedMemberId === member.id}
            />
          ))}
        </View>
        <PrimaryButton
          fullWidth
          label={editingTask ? 'לשמור שינויים' : 'להוסיף משימה'}
          onPress={() => {
            saveTask({
              id: editingTask?.id,
              title,
              dueDate,
              assignedMemberId,
            });
            closeEditor();
          }}
        />
      </ModalSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    ...rtlRow,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  list: {
    gap: theme.spacing.md,
  },
});
