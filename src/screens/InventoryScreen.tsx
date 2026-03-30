import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useMemo, useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  AppHeader,
  AppScreen,
  ChoiceChip,
  ConfirmationDialog,
  EmptyState,
  InventoryItemCard,
  ModalSheet,
  PrimaryButton,
  SearchField,
  StatusChip,
  TextField,
} from '../components';
import { AppTabScreenProps } from '../navigation/types';
import { selectInventoryItems } from '../store/selectors';
import { useAppStore } from '../store/useAppStore';
import { rtlRow, rtlText, theme } from '../theme';
import { stockStatusMeta } from '../utils/status';

type FilterKey = 'all' | 'inStock' | 'lowStock' | 'outOfStock';
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

function SheetOption({
  title,
  description,
  icon,
  tone,
  onPress,
}: {
  title: string;
  description: string;
  icon: IconName;
  tone: 'primary' | 'success' | 'danger';
  onPress: () => void;
}) {
  return (
    <View style={styles.sheetOptionOuter}>
      <PrimaryButton
        fullWidth
        icon={icon}
        label={title}
        onPress={onPress}
        tone={tone}
      />
      <Text style={styles.sheetOptionDescription}>{description}</Text>
    </View>
  );
}

export function InventoryScreen(_: AppTabScreenProps<'Inventory'>) {
  const inventoryItems = useAppStore(selectInventoryItems);
  const pendingOutOfStockItemId = useAppStore(
    (state) => state.pendingOutOfStockItemId,
  );
  const beginOutOfStockFlow = useAppStore((state) => state.beginOutOfStockFlow);
  const cancelOutOfStockFlow = useAppStore((state) => state.cancelOutOfStockFlow);
  const resolveOutOfStock = useAppStore((state) => state.resolveOutOfStock);
  const setInventoryStatus = useAppStore((state) => state.setInventoryStatus);
  const addInventoryItemToShopping = useAppStore(
    (state) => state.addInventoryItemToShopping,
  );
  const updateInventoryItem = useAppStore((state) => state.updateInventoryItem);

  const [filter, setFilter] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editNote, setEditNote] = useState('');
  const [removeId, setRemoveId] = useState<string | null>(null);

  const items = useMemo(
    () => inventoryItems.filter((item) => !item.archived),
    [inventoryItems],
  );

  const pendingOutOfStockItem = useMemo(
    () =>
      inventoryItems.find((item) => item.id === pendingOutOfStockItemId),
    [inventoryItems, pendingOutOfStockItemId],
  );

  const totals = useMemo(
    () => ({
      all: items.length,
      inStock: items.filter((item) => item.stockStatus === 'inStock').length,
      lowStock: items.filter((item) => item.stockStatus === 'lowStock').length,
      outOfStock: items.filter((item) => item.stockStatus === 'outOfStock').length,
    }),
    [items],
  );

  const attentionCount = totals.lowStock + totals.outOfStock;

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim();

    return items.filter((item) => {
      if (filter !== 'all' && item.stockStatus !== filter) {
        return false;
      }

      if (normalizedSearch) {
        return item.name.includes(normalizedSearch);
      }

      return true;
    });
  }, [filter, items, search]);

  const removeItem = useMemo(
    () => items.find((item) => item.id === removeId),
    [items, removeId],
  );

  const setFilterWithAnimation = (nextFilter: FilterKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFilter(nextFilter);
  };

  const handleStatusChange = (
    itemId: string,
    status: 'inStock' | 'lowStock',
  ) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setInventoryStatus(itemId, status);
  };

  const handleAddToShopping = (itemId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    addInventoryItemToShopping(itemId);
  };

  return (
    <AppScreen backgroundDecor={<View style={styles.backgroundDecor} />}>
      <AppHeader
        subtitle={
          totals.all === 0
            ? 'עוד לא שמרתם פריטים בבית'
            : attentionCount > 0
              ? `${attentionCount} פריטים צריכים תשומת לב עכשיו`
              : `${totals.inStock} פריטים זמינים כרגע בבית`
        }
        title="יש בבית"
        trailing={
          <StatusChip
            icon="fridge-outline"
            label={
              totals.all === 0
                ? 'עדיין ריק'
                : attentionCount
                ? `${attentionCount} דורשים בדיקה`
                : `${totals.all} במלאי`
            }
            size="sm"
            tone={
              totals.all === 0
                ? 'neutral'
                : totals.outOfStock > 0
                ? 'danger'
                : totals.lowStock > 0
                  ? 'warning'
                  : 'success'
            }
          />
        }
      />

      <View style={styles.topControls}>
        <View style={styles.overviewRow}>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewValue}>{totals.inStock}</Text>
            <Text style={styles.overviewLabel}>יש בבית</Text>
          </View>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewValue}>{totals.lowStock}</Text>
            <Text style={styles.overviewLabel}>כמעט נגמר</Text>
          </View>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewValue}>{totals.outOfStock}</Text>
            <Text style={styles.overviewLabel}>נגמר</Text>
          </View>
        </View>

        <SearchField
          onChangeText={setSearch}
          placeholder="חיפוש במלאי"
          value={search}
        />

        <View style={styles.filterRow}>
          <ChoiceChip
            count={totals.all}
            label="הכל"
            onPress={() => setFilterWithAnimation('all')}
            selected={filter === 'all'}
          />
          <ChoiceChip
            count={totals.inStock}
            icon="check-circle-outline"
            label="יש בבית"
            onPress={() => setFilterWithAnimation('inStock')}
            selected={filter === 'inStock'}
          />
          <ChoiceChip
            count={totals.lowStock}
            icon="signal-distance-variant"
            label="כמעט נגמר"
            onPress={() => setFilterWithAnimation('lowStock')}
            selected={filter === 'lowStock'}
          />
          <ChoiceChip
            count={totals.outOfStock}
            icon="close-circle-outline"
            label="נגמר"
            onPress={() => setFilterWithAnimation('outOfStock')}
            selected={filter === 'outOfStock'}
          />
        </View>
      </View>

      {filteredItems.length ? (
        <View style={styles.list}>
          {filteredItems.map((item) => {
            const meta = stockStatusMeta[item.stockStatus];
            const statusHint =
              item.stockStatus === 'inStock'
                ? 'יש כרגע בבית. אפשר להוסיף לקניות רק אם רוצים להיערך מראש.'
                : item.stockStatus === 'lowStock'
                  ? 'נשאר מעט בבית, וכדאי לזכור אותו לקנייה הקרובה.'
                  : 'כרגע חסר בבית. אפשר להחזיר לקניות, להשאיר כנגמר או להסיר.';

            return (
              <InventoryItemCard
                category={item.category}
                key={item.id}
                name={item.name}
                note={item.note}
                onAddToShopping={() => handleAddToShopping(item.id)}
                onArchive={() => setRemoveId(item.id)}
                onEdit={() => {
                  setEditingId(item.id);
                  setEditName(item.name);
                  setEditQuantity(item.quantityLabel ?? '');
                  setEditNote(item.note ?? '');
                }}
                onMarkInStock={() => handleStatusChange(item.id, 'inStock')}
                onMarkLow={() => handleStatusChange(item.id, 'lowStock')}
                onMarkOut={() => beginOutOfStockFlow(item.id)}
                quantityLabel={item.quantityLabel}
                statusHint={statusHint}
                statusLabel={meta.label}
                statusTone={meta.tone}
                variant={item.stockStatus}
              />
            );
          })}
        </View>
      ) : (
        <EmptyState
          actionLabel="לאפס חיפוש"
          description="נסו חיפוש אחר או חזרו לכל הפריטים כדי לראות שוב את מצב הבית."
          icon="fridge-outline"
          onActionPress={() => {
            setSearch('');
            setFilter('all');
          }}
          title="לא נמצאו פריטים לתצוגה הזו"
        />
      )}

      <ModalSheet
        onClose={() => {
          setEditingId(null);
          setEditName('');
          setEditQuantity('');
          setEditNote('');
        }}
        subtitle="עדכון קצר של שם, כמות או הערה בלי לצאת מהמסך."
        title="עריכת פריט"
        visible={Boolean(editingId)}
      >
        <TextField
          label="שם הפריט"
          onChangeText={setEditName}
          placeholder="למשל שמן זית"
          value={editName}
        />
        <TextField
          label="כמות"
          onChangeText={setEditQuantity}
          placeholder="למשל בקבוק אחד"
          value={editQuantity}
        />
        <TextField
          label="הערה"
          multiline
          onChangeText={setEditNote}
          placeholder="מה חשוב לזכור על הפריט"
          value={editNote}
        />
        <PrimaryButton
          fullWidth
          label="לשמור שינויים"
          onPress={() => {
            if (!editingId) {
              return;
            }

            updateInventoryItem({
              id: editingId,
              name: editName,
              quantityLabel: editQuantity,
              note: editNote,
            });
            setEditingId(null);
          }}
        />
      </ModalSheet>

      <ModalSheet
        onClose={cancelOutOfStockFlow}
        subtitle={
          pendingOutOfStockItem
            ? `${pendingOutOfStockItem.name} סומן כנגמר. בחרו איך תרצו שהבית יתנהג מכאן.`
            : undefined
        }
        title="הפריט נגמר"
        visible={Boolean(pendingOutOfStockItemId)}
      >
        <SheetOption
          description="הפריט יחזור מיד לרשימת הקניות."
          icon="cart-plus"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            resolveOutOfStock('returnToShopping');
          }}
          title="להחזיר לרשימת הקניות"
          tone="primary"
        />
        <SheetOption
          description="הפריט יישאר מסומן כנגמר בלי לחזור לקניות."
          icon="check-circle-outline"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            resolveOutOfStock('keepOut');
          }}
          title="להשאיר כנגמר"
          tone="success"
        />
        <SheetOption
          description="הפריט יוסר לגמרי מהמלאי של הבית."
          icon="trash-can-outline"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            resolveOutOfStock('archive');
          }}
          title="להסיר מהמלאי"
          tone="danger"
        />
      </ModalSheet>

      <ConfirmationDialog
        confirmLabel="להסיר"
        description={
          removeItem
            ? `הפריט ${removeItem.name} יוסר מהמלאי המקומי של הבית.`
            : ''
        }
        onCancel={() => setRemoveId(null)}
        onConfirm={() => {
          if (!removeId) {
            return;
          }
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          useAppStore.getState().beginOutOfStockFlow(removeId);
          useAppStore.getState().resolveOutOfStock('archive');
          setRemoveId(null);
        }}
        title="להסיר את הפריט?"
        tone="danger"
        visible={Boolean(removeId)}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  backgroundDecor: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primarySoft,
    opacity: 0.48,
  },
  topControls: {
    gap: theme.spacing.md,
  },
  overviewRow: {
    ...rtlRow,
    gap: theme.spacing.sm,
  },
  overviewCard: {
    flex: 1,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceWarm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  overviewValue: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  overviewLabel: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  filterRow: {
    ...rtlRow,
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  list: {
    gap: theme.spacing.md,
  },
  sheetOptionOuter: {
    gap: theme.spacing.sm,
  },
  sheetOptionDescription: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
