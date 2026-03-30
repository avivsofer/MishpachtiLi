import { useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  AppHeader,
  AppScreen,
  EmptyState,
  QuickAddBar,
  SectionHeader,
  ShoppingItemRow,
  StatusChip,
} from '../components';
import { AppTabScreenProps } from '../navigation/types';
import { selectMembers, selectShoppingItems } from '../store/selectors';
import { useAppStore } from '../store/useAppStore';
import { rtlRow, rtlTextBlock, theme } from '../theme';

const easeLayout = {
  duration: 220,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export function ShoppingListScreen(_: AppTabScreenProps<'Shopping'>) {
  const members = useAppStore(selectMembers);
  const shoppingItems = useAppStore(selectShoppingItems);
  const addShoppingItem = useAppStore((state) => state.addShoppingItem);
  const markShoppingPurchased = useAppStore((state) => state.markShoppingPurchased);
  const removeShoppingItem = useAppStore((state) => state.removeShoppingItem);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [recentlyPurchasedId, setRecentlyPurchasedId] = useState<string | null>(null);
  const purchaseHighlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (purchaseHighlightTimeout.current) {
        clearTimeout(purchaseHighlightTimeout.current);
      }
    };
  }, []);

  const todayKey = new Date().toISOString().slice(0, 10);

  const pendingItems = useMemo(
    () => shoppingItems.filter((item) => item.status === 'pending'),
    [shoppingItems],
  );

  const purchasedToday = useMemo(
    () =>
      shoppingItems.filter(
        (item) =>
          item.status === 'purchased' && item.purchasedAt?.slice(0, 10) === todayKey,
      ),
    [shoppingItems, todayKey],
  );

  const memberNames = useMemo(
    () => new Map(members.map((member) => [member.id, member.name])),
    [members],
  );

  const resolveMemberName = (memberId: string) => memberNames.get(memberId) ?? 'בן בית';

  const handleAdd = () => {
    if (!name.trim()) {
      return;
    }

    LayoutAnimation.configureNext(easeLayout);
    addShoppingItem({ name, quantityLabel: quantity });
    setName('');
    setQuantity('');
  };

  const handlePurchase = (itemId: string) => {
    LayoutAnimation.configureNext(easeLayout);
    markShoppingPurchased(itemId);
    setRecentlyPurchasedId(itemId);

    if (purchaseHighlightTimeout.current) {
      clearTimeout(purchaseHighlightTimeout.current);
    }

    purchaseHighlightTimeout.current = setTimeout(() => {
      setRecentlyPurchasedId(null);
    }, 1800);
  };

  const handleRemove = (itemId: string) => {
    LayoutAnimation.configureNext(easeLayout);
    removeShoppingItem(itemId);
  };

  return (
    <AppScreen backgroundDecor={<View style={styles.backgroundDecor} />}>
      <AppHeader
        subtitle={
          pendingItems.length
            ? `${pendingItems.length} פריטים עדיין חסרים בבית`
            : 'הרשימה רגועה כרגע'
        }
        title="קניות"
        trailing={
          <StatusChip
            label={
              purchasedToday.length
                ? `${purchasedToday.length} נקנו היום`
                : `${pendingItems.length} ממתינים`
            }
            size="sm"
            tone={purchasedToday.length ? 'success' : 'primary'}
          />
        }
      />

      <QuickAddBar
        actionLabel="להוסיף"
        icon="cart-plus"
        onChangeText={setName}
        onSecondaryChangeText={setQuantity}
        onSubmit={handleAdd}
        placeholder="מה חסר בבית?"
        secondaryPlaceholder="כמות"
        secondaryValue={quantity}
        submitDisabled={!name.trim()}
        title="להוסיף משהו לבית?"
        value={name}
        variant="hero"
      />

      <View style={styles.section}>
        <SectionHeader
          subtitle="מה שחסר עכשיו בדרך הביתה"
          title="לקנות עכשיו"
        />
        {pendingItems.length ? (
          <View style={styles.list}>
            {pendingItems.map((item) => (
              <ShoppingItemRow
                addedByName={resolveMemberName(item.addedById)}
                key={item.id}
                name={item.name}
                note={item.note}
                onMarkPurchased={() => handlePurchase(item.id)}
                onRemove={() => handleRemove(item.id)}
                quantityLabel={item.quantityLabel}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            actionLabel="להוסיף פריט ראשון"
            description="מוסיפים פריט אחד קטן, ומשם הרשימה כבר זזה יחד עם הבית."
            icon="cart-outline"
            onActionPress={() => setName('חלב')}
            title="אין כרגע מה לקנות"
          />
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader
          subtitle="מה שכבר סומן ונכנס ישר למלאי הבית"
          title="נכנס לבית היום"
        />
        <View style={styles.purchasedPanel}>
          {purchasedToday.length ? (
            purchasedToday.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.purchasedRow,
                  item.id === recentlyPurchasedId && styles.purchasedRowHighlighted,
                ]}
              >
                <View style={styles.purchasedIcon}>
                  <Text style={styles.purchasedIconMark}>✓</Text>
                </View>
                <View style={styles.purchasedCopy}>
                  <View style={styles.purchasedTitleRow}>
                    <Text numberOfLines={1} style={styles.purchasedTitle}>
                      {item.name}
                    </Text>
                    {item.quantityLabel ? (
                      <StatusChip
                        label={item.quantityLabel}
                        size="sm"
                        tone="success"
                      />
                    ) : null}
                  </View>
                  <Text style={styles.purchasedMeta}>
                    נוסף ליש בבית ומוכן לעדכון מצב
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.purchasedEmptyBox}>
              <Text style={styles.purchasedEmptyTitle}>עוד לא סומן משהו כנרכש</Text>
              <Text style={styles.purchasedEmptyText}>
                ברגע שתסמנו פריט, הוא יופיע כאן ויעבור אוטומטית ליש בבית.
              </Text>
            </View>
          )}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  backgroundDecor: {
    position: 'absolute',
    top: -50,
    left: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: theme.colors.accentSoft,
    opacity: 0.55,
  },
  section: {
    gap: theme.spacing.lg,
  },
  list: {
    gap: theme.spacing.md,
  },
  purchasedPanel: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.successSoft,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  purchasedRow: {
    ...rtlRow,
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.md,
  },
  purchasedRowHighlighted: {
    borderWidth: 1,
    borderColor: theme.colors.success,
  },
  purchasedIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.success,
  },
  purchasedIconMark: {
    color: theme.colors.white,
    fontWeight: '700',
  },
  purchasedCopy: {
    flex: 1,
    gap: theme.spacing.xs,
    alignItems: 'stretch',
  },
  purchasedTitleRow: {
    ...rtlRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  purchasedTitle: {
    ...theme.typography.bodyStrong,
    ...rtlTextBlock,
    flex: 1,
    color: theme.colors.textPrimary,
  },
  purchasedMeta: {
    ...theme.typography.meta,
    ...rtlTextBlock,
    color: theme.colors.textSecondary,
  },
  purchasedEmptyBox: {
    gap: theme.spacing.xs,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.lg,
  },
  purchasedEmptyTitle: {
    ...theme.typography.bodyStrong,
    ...rtlTextBlock,
    color: theme.colors.textPrimary,
  },
  purchasedEmptyText: {
    ...theme.typography.meta,
    ...rtlTextBlock,
    color: theme.colors.textSecondary,
  },
});
