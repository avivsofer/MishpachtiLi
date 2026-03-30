import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppHeader,
  AppScreen,
  EmptyState,
  GiftCard,
  ModalSheet,
  PrimaryButton,
  TextField,
} from '../components';
import { AppStackScreenProps } from '../navigation/types';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme';
import { giftStatusMeta } from '../utils/status';

export function GiftsScreen({ navigation }: AppStackScreenProps<'Gifts'>) {
  const gifts = useAppStore((state) => state.gifts);
  const saveGift = useAppStore((state) => state.saveGift);
  const markGiftPurchased = useAppStore((state) => state.markGiftPurchased);
  const sendGiftToShopping = useAppStore((state) => state.sendGiftToShopping);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [event, setEvent] = useState('');
  const [notes, setNotes] = useState('');

  const editingGift = gifts.find((gift) => gift.id === editingId) ?? null;

  const closeEditor = () => {
    setSheetOpen(false);
    setEditingId(null);
    setTitle('');
    setRecipient('');
    setEvent('');
    setNotes('');
  };

  const openEditor = (giftId?: string) => {
    setSheetOpen(true);

    if (!giftId) {
      setEditingId(null);
      setTitle('');
      setRecipient('');
      setEvent('');
      setNotes('');
      return;
    }

    const gift = gifts.find((entry) => entry.id === giftId);

    if (!gift) {
      return;
    }

    setEditingId(gift.id);
    setTitle(gift.title);
    setRecipient(gift.recipient);
    setEvent(gift.event);
    setNotes(gift.notes ?? '');
  };

  return (
    <AppScreen>
      <AppHeader
        onBack={() => navigation.goBack()}
        showBack
        subtitle="רעיונות, תכנון, וקיצור דרך לרשימת הקניות"
        title="מתנות"
        trailing={
          <PrimaryButton label="רעיון חדש" onPress={() => openEditor()} size="small" />
        }
      />

      {gifts.length ? (
        <View style={styles.list}>
          {gifts.map((gift) => {
            const meta = giftStatusMeta[gift.status];

            return (
              <GiftCard
                event={gift.event}
                key={gift.id}
                notes={gift.notes}
                onEdit={() => openEditor(gift.id)}
                onMarkPurchased={() => markGiftPurchased(gift.id)}
                onSendToShopping={() => sendGiftToShopping(gift.id)}
                recipient={gift.recipient}
                statusLabel={meta.label}
                statusTone={meta.tone}
                title={gift.title}
              />
            );
          })}
        </View>
      ) : (
        <EmptyState
          actionLabel="להוסיף רעיון ראשון"
          description="אפשר לשמור כאן רעיונות קטנים ולהחליט אחר כך אם להפוך אותם לקנייה."
          icon="gift-outline"
          onActionPress={() => openEditor()}
          title="אין עדיין רעיונות למתנות"
        />
      )}

      <ModalSheet
        onClose={closeEditor}
        subtitle={
          editingGift ? 'עדכון של רעיון קיים' : 'רעיון חדש שאפשר לשמור ולחדד בהמשך'
        }
        title={editingGift ? 'עריכת מתנה' : 'מתנה חדשה'}
        visible={sheetOpen}
      >
        <TextField
          label="כותרת"
          onChangeText={setTitle}
          placeholder="למשל: מתנה ליום הולדת לאמא"
          value={title}
        />
        <TextField
          label="למי"
          onChangeText={setRecipient}
          placeholder="למי מיועדת המתנה?"
          value={recipient}
        />
        <TextField
          label="אירוע"
          onChangeText={setEvent}
          placeholder="יום הולדת, סוף שנה, חג..."
          value={event}
        />
        <TextField
          label="הערות"
          multiline
          onChangeText={setNotes}
          placeholder="כיוון, תקציב, או כל פרט שעוזר לזכור"
          value={notes}
        />
        <PrimaryButton
          fullWidth
          label={editingGift ? 'לשמור שינויים' : 'להוסיף רעיון'}
          onPress={() => {
            saveGift({
              id: editingGift?.id,
              title,
              recipient,
              event,
              notes,
            });
            closeEditor();
          }}
        />
      </ModalSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: theme.spacing.md,
  },
});
