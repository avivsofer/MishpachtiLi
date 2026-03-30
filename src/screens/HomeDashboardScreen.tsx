import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  AppHeader,
  AppScreen,
  EmptyState,
  PrimaryButton,
  SectionHeader,
  SecondaryButton,
  StatusChip,
  SummaryCard,
} from '../components';
import { AppTabScreenProps } from '../navigation/types';
import {
  selectCustomLists,
  selectInventoryItems,
  selectShoppingItems,
  selectTasks,
} from '../store/selectors';
import { useAppStore } from '../store/useAppStore';
import { ltrText, rtlRow, rtlText, theme } from '../theme';
import { getGreeting } from '../utils/formatters';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

function DashboardActionTile({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionTile, pressed && styles.actionTilePressed]}>
      <View style={styles.actionTileIcon}>
        <MaterialCommunityIcons color={theme.colors.primary} name={icon} size={20} />
      </View>
      <View style={styles.actionTileCopy}>
        <Text numberOfLines={1} style={styles.actionTileTitle}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.actionTileSubtitle}>
          {subtitle}
        </Text>
      </View>
      <MaterialCommunityIcons
        color={theme.colors.textMuted}
        name="chevron-left"
        size={18}
      />
    </Pressable>
  );
}

export function HomeDashboardScreen({ navigation }: AppTabScreenProps<'Home'>) {
  const session = useAppStore((state) => state.session);
  const household = useAppStore((state) => state.household);
  const shoppingItems = useAppStore(selectShoppingItems);
  const inventoryItems = useAppStore(selectInventoryItems);
  const customLists = useAppStore(selectCustomLists);
  const tasks = useAppStore(selectTasks);

  const activeInventoryItems = useMemo(
    () => inventoryItems.filter((item) => !item.archived),
    [inventoryItems],
  );

  const openTasks = useMemo(
    () => tasks.filter((task) => task.status === 'open'),
    [tasks],
  );

  const activeLists = useMemo(
    () => customLists.filter((list) => list.kind === 'active'),
    [customLists],
  );

  const summary = useMemo(
    () => ({
      itemsToBuy: shoppingItems.filter((item) => item.status === 'pending').length,
      lowStockItems: activeInventoryItems.filter(
        (item) => item.stockStatus === 'lowStock',
      ).length,
      outOfStockItems: activeInventoryItems.filter(
        (item) => item.stockStatus === 'outOfStock',
      ).length,
      activeLists: activeLists.length,
      openTasks: openTasks.length,
    }),
    [activeInventoryItems, activeLists.length, openTasks.length, shoppingItems],
  );

  const needsAttention = useMemo(() => {
    const outOfStockItems = activeInventoryItems
      .filter((item) => item.stockStatus === 'outOfStock')
      .map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: 'נגמר בבית וצריך החלטה',
        type: 'inventory' as const,
      }));

    const lowStockItems = activeInventoryItems
      .filter((item) => item.stockStatus === 'lowStock')
      .map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: 'כמעט נגמר, כדאי להחזיר לקניות',
        type: 'inventory' as const,
      }));

    const urgentTasks = openTasks.slice(0, 2).map((task) => ({
      id: task.id,
      title: task.title,
      subtitle: 'משימה פתוחה בבית',
      type: 'task' as const,
    }));

    return [...outOfStockItems, ...lowStockItems, ...urgentTasks].slice(0, 5);
  }, [activeInventoryItems, openTasks]);

  const focusCopy =
    summary.outOfStockItems > 0
      ? `${summary.outOfStockItems} פריטים כבר נגמרו בבית, ו-${summary.itemsToBuy} נוספים מחכים לקנייה.`
      : summary.lowStockItems > 0
        ? `${summary.lowStockItems} פריטים כמעט נגמרו, וזה זמן טוב לרענן את המלאי.`
        : summary.itemsToBuy > 0
          ? `יש ${summary.itemsToBuy} דברים קטנים להשלים כדי שהבית ירגיש מסודר.`
          : 'הבית נראה רגוע כרגע, עם מקום להמשיך לעדכן רשימות ומשימות.';

  const homeSignals = [
    {
      label: 'משימות פתוחות',
      value: summary.openTasks,
      tone: 'accent' as const,
      icon: 'check-decagram-outline' as IconName,
    },
    {
      label: 'רשימות פעילות',
      value: summary.activeLists,
      tone: 'primary' as const,
      icon: 'format-list-checkbox' as IconName,
    },
  ];

  return (
    <AppScreen backgroundDecor={<View style={styles.backgroundDecor} />}>
      <AppHeader
        subtitle={`${household.name}${household.city ? ` · ${household.city}` : ''}`}
        title={`${getGreeting()}, ${session.displayName}`}
        trailing={
          <StatusChip
            icon="home-heart"
            label="הבית שלכם"
            size="sm"
            tone="accent"
          />
        }
      />

      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.heroCopy}>
            <View style={styles.heroMetaRow}>
              <StatusChip
                icon="map-marker-outline"
                label={household.city ?? 'הבית'}
                size="sm"
                tone="primary"
              />
              <Text style={styles.heroInvite}>
                קוד הזמנה: <Text style={styles.heroInviteCode}>{household.inviteCode}</Text>
              </Text>
            </View>
            <Text style={styles.heroTitle}>מה הבית צריך עכשיו?</Text>
            <Text style={styles.heroText}>{focusCopy}</Text>
          </View>
          <View style={styles.heroBadge}>
            <MaterialCommunityIcons
              color={theme.colors.primary}
              name="home-variant-outline"
              size={28}
            />
          </View>
        </View>

        <View style={styles.signalRow}>
          {homeSignals.map((signal) => (
            <View key={signal.label} style={styles.signalCard}>
              <View style={styles.signalLabelRow}>
                <MaterialCommunityIcons
                  color={theme.colors.textMuted}
                  name={signal.icon}
                  size={14}
                />
                <Text style={styles.signalLabel}>{signal.label}</Text>
              </View>
              <Text style={styles.signalValue}>{signal.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.heroActions}>
          <View style={styles.heroActionPrimary}>
            <PrimaryButton
              fullWidth
              icon="cart-outline"
              label="לפתוח קניות"
              onPress={() => navigation.navigate('Shopping')}
            />
          </View>
          <View style={styles.heroActionSecondary}>
            <SecondaryButton
              fullWidth
              icon="fridge-outline"
              label="לעדכן מלאי"
              onPress={() => navigation.navigate('Inventory')}
              tone="primary"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          subtitle="תמונה שקטה אבל מדויקת של הבית"
          title="היום בבית"
        />
        <View style={styles.summaryGrid}>
          <SummaryCard
            caption="ממתינים לקנייה"
            icon="cart-outline"
            label="לקנות"
            tone="primary"
            value={summary.itemsToBuy}
          />
          <SummaryCard
            caption="דורשים מעקב"
            icon="signal-distance-variant"
            label="כמעט נגמר"
            tone="warning"
            value={summary.lowStockItems}
          />
          <SummaryCard
            caption="מחכים להחלטה"
            icon="close-circle-outline"
            label="נגמר"
            tone="danger"
            value={summary.outOfStockItems}
          />
          <SummaryCard
            caption="נשארו פתוחות"
            icon="format-list-checkbox"
            label="רשימות פעילות"
            tone="accent"
            value={summary.activeLists}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          subtitle="קיצורי דרך טבעיים למה שעושים הרבה"
          title="פעולות מהירות"
        />
        <View style={styles.actionGrid}>
          <DashboardActionTile
            icon="cart-variant"
            onPress={() => navigation.navigate('Shopping')}
            subtitle={`${summary.itemsToBuy} פריטים ממתינים עכשיו`}
            title="קניות הבית"
          />
          <DashboardActionTile
            icon="fridge-outline"
            onPress={() => navigation.navigate('Inventory')}
            subtitle={`${summary.lowStockItems + summary.outOfStockItems} פריטים דורשים תשומת לב`}
            title="מלאי הבית"
          />
          <DashboardActionTile
            icon="check-decagram-outline"
            onPress={() => navigation.navigate('Tasks')}
            subtitle={
              openTasks.length
                ? `${openTasks[0].title}${openTasks.length > 1 ? ' ועוד' : ''}`
                : 'להוסיף משימה קטנה לבית'
            }
            title="משימות פתוחות"
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          subtitle="אלו הדברים שבאמת כדאי לטפל בהם עכשיו"
          title="דורש תשומת לב"
        />
        {needsAttention.length ? (
          <View style={styles.attentionPanel}>
            {needsAttention.map((item, index) => {
              const isTask = item.type === 'task';

              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(isTask ? 'Tasks' : 'Inventory')
                  }
                  style={({ pressed }) => [
                    styles.attentionRow,
                    pressed && styles.attentionRowPressed,
                    index > 0 && styles.attentionRowBorder,
                  ]}
                >
                  <View
                    style={[
                      styles.attentionIcon,
                      isTask ? styles.attentionIconAccent : styles.attentionIconWarning,
                    ]}
                  >
                    <MaterialCommunityIcons
                      color={isTask ? theme.colors.accent : theme.colors.warning}
                      name={isTask ? 'check-decagram-outline' : 'package-variant-closed'}
                      size={18}
                    />
                  </View>
                  <View style={styles.attentionCopy}>
                    <Text numberOfLines={1} style={styles.attentionTitle}>
                      {item.title}
                    </Text>
                    <Text numberOfLines={2} style={styles.attentionSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    color={theme.colors.textMuted}
                    name="chevron-left"
                    size={18}
                  />
                </Pressable>
              );
            })}
          </View>
        ) : (
          <EmptyState
            description="כרגע הכול נראה רגוע. זה זמן טוב לעדכן רשימות, רעיונות ומתנות."
            icon="home-heart"
            onActionPress={() => navigation.navigate('Lists')}
            actionLabel="לפתוח רשימות"
            title="אין משהו בוער עכשיו"
          />
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  backgroundDecor: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: theme.colors.primarySoft,
    opacity: 0.42,
  },
  heroCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
    gap: theme.spacing.xl,
    ...theme.shadow.card,
  },
  heroTop: {
    ...rtlRow,
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
    alignItems: 'flex-start',
  },
  heroCopy: {
    flex: 1,
    gap: theme.spacing.md,
  },
  heroMetaRow: {
    ...rtlRow,
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  heroInvite: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  heroInviteCode: {
    ...ltrText,
    color: theme.colors.textPrimary,
  },
  heroTitle: {
    ...theme.typography.title,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  heroText: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  heroBadge: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySoft,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
  },
  signalRow: {
    ...rtlRow,
    gap: theme.spacing.sm,
  },
  signalCard: {
    flex: 1,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceWarm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  signalLabelRow: {
    ...rtlRow,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  signalLabel: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  signalValue: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  heroActions: {
    ...rtlRow,
    gap: theme.spacing.sm,
  },
  heroActionPrimary: {
    flex: 1.2,
  },
  heroActionSecondary: {
    flex: 1,
  },
  section: {
    gap: theme.spacing.lg,
  },
  summaryGrid: {
    ...rtlRow,
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  actionGrid: {
    gap: theme.spacing.sm,
  },
  actionTile: {
    ...rtlRow,
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    ...theme.shadow.soft,
  },
  actionTilePressed: {
    opacity: 0.94,
  },
  actionTileIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySoft,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
  },
  actionTileCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  actionTileTitle: {
    ...theme.typography.bodyStrong,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  actionTileSubtitle: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  attentionPanel: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    ...theme.shadow.soft,
  },
  attentionRow: {
    ...rtlRow,
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  attentionRowPressed: {
    opacity: 0.94,
  },
  attentionRowBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  attentionIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attentionIconAccent: {
    backgroundColor: theme.colors.accentSoft,
  },
  attentionIconWarning: {
    backgroundColor: theme.colors.warningSoft,
  },
  attentionCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  attentionTitle: {
    ...theme.typography.bodyStrong,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  attentionSubtitle: {
    ...theme.typography.meta,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
});
