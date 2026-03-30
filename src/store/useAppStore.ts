import { create } from 'zustand';

import {
  currentMemberId,
  seedCustomLists,
  seedGifts,
  seedHousehold,
  seedInventoryItems,
  seedMembers,
  seedSession,
  seedShoppingItems,
  seedTasks,
} from '../data/seed';
import type {
  CustomList,
  GiftDraft,
  GiftItem,
  Household,
  HouseholdMember,
  HouseholdSetupPayload,
  InventoryDraft,
  InventoryItem,
  MemberDraft,
  OutOfStockChoice,
  SessionState,
  ShoppingDraft,
  ShoppingItem,
  TaskDraft,
  TaskItem,
  ToastMessage,
} from '../types/domain';
import { getInitials, normalizeName } from '../utils/formatters';
import { createId } from '../utils/id';

type AppState = {
  session: SessionState;
  household: Household;
  members: HouseholdMember[];
  shoppingItems: ShoppingItem[];
  inventoryItems: InventoryItem[];
  customLists: CustomList[];
  gifts: GiftItem[];
  tasks: TaskItem[];
  activeToast: ToastMessage | null;
  pendingOutOfStockItemId: string | null;
};

type AppActions = {
  completeWelcome(): void;
  signIn(displayName: string): void;
  setupHousehold(payload: HouseholdSetupPayload): void;
  updateProfile(payload: { displayName: string; householdName: string }): void;
  logout(): void;
  dismissToast(): void;
  addShoppingItem(draft: ShoppingDraft): void;
  removeShoppingItem(itemId: string): void;
  markShoppingPurchased(itemId: string): void;
  addInventoryItemToShopping(itemId: string): void;
  updateInventoryItem(draft: InventoryDraft): void;
  setInventoryStatus(itemId: string, status: InventoryItem['stockStatus']): void;
  beginOutOfStockFlow(itemId: string): void;
  cancelOutOfStockFlow(): void;
  resolveOutOfStock(choice: OutOfStockChoice): void;
  createCustomList(title: string): void;
  useTemplateList(templateId: string): void;
  toggleCustomListItem(listId: string, itemId: string): void;
  addCustomListItem(listId: string, title: string): void;
  saveGift(draft: GiftDraft): void;
  markGiftPurchased(giftId: string): void;
  sendGiftToShopping(giftId: string): void;
  saveTask(draft: TaskDraft): void;
  toggleTaskStatus(taskId: string): void;
  addMember(draft: MemberDraft): void;
};

export type AppStoreState = AppState & AppActions;

const createInitialState = (): AppState => ({
  session: { ...seedSession },
  household: { ...seedHousehold },
  members: seedMembers.map((member) => ({ ...member })),
  shoppingItems: seedShoppingItems.map((item) => ({ ...item })),
  inventoryItems: seedInventoryItems.map((item) => ({ ...item })),
  customLists: seedCustomLists.map((list) => ({
    ...list,
    items: list.items.map((item) => ({ ...item })),
  })),
  gifts: seedGifts.map((gift) => ({ ...gift })),
  tasks: seedTasks.map((task) => ({ ...task })),
  activeToast: null,
  pendingOutOfStockItemId: null,
});

function showToast(title: string, tone: ToastMessage['tone'], description?: string) {
  return {
    id: createId('toast'),
    title,
    tone,
    description,
  } satisfies ToastMessage;
}

function addOrUpdatePendingShoppingItem(
  items: ShoppingItem[],
  draft: ShoppingDraft,
  addedById: string,
): ShoppingItem[] {
  const existingItem = items.find(
    (item) =>
      item.status === 'pending' &&
      normalizeName(item.name) === normalizeName(draft.name),
  );

  if (existingItem) {
    return items.map((item) =>
      item.id === existingItem.id
        ? {
            ...item,
            quantityLabel: draft.quantityLabel || item.quantityLabel,
            note: draft.note || item.note,
            updatedAt: new Date().toISOString(),
          }
        : item,
    );
  }

  const nextItem: ShoppingItem = {
    id: createId('shopping'),
    name: draft.name.trim(),
    quantityLabel: draft.quantityLabel?.trim(),
    note: draft.note?.trim(),
    addedById,
    status: 'pending',
    source: draft.source ?? 'manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return [nextItem, ...items];
}

export const useAppStore = create<AppStoreState>()((set, get) => ({
  ...createInitialState(),
  completeWelcome() {
    set((state) => ({
      session: { ...state.session, hasSeenWelcome: true },
    }));
  },
  signIn(displayName) {
    const resolvedName = displayName.trim() || 'אביב';

    set((state) => ({
      session: {
        ...state.session,
        isAuthenticated: true,
        displayName: resolvedName,
      },
      members: state.members.map((member) =>
        member.isCurrentUser
          ? { ...member, name: resolvedName, initials: getInitials(resolvedName) }
          : member,
      ),
      activeToast: showToast('נכנסת בהצלחה', 'success', 'ממשיכים להגדרת הבית'),
    }));
  },
  setupHousehold(payload) {
    set((state) => ({
      session: { ...state.session, householdReady: true },
      household: {
        ...state.household,
        name:
          payload.mode === 'create'
            ? payload.householdName?.trim() || state.household.name
            : state.household.name,
        inviteCode:
          payload.mode === 'join'
            ? payload.inviteCode?.trim() || state.household.inviteCode
            : state.household.inviteCode,
      },
      activeToast: showToast(
        payload.mode === 'create' ? 'הבית נוצר' : 'הצטרפת לבית קיים',
        'success',
        'אפשר להתחיל לנהל יחד את הקניות והמשימות',
      ),
    }));
  },
  updateProfile(payload) {
    const displayName = payload.displayName.trim() || 'אביב';

    set((state) => ({
      session: { ...state.session, displayName },
      household: {
        ...state.household,
        name: payload.householdName.trim() || state.household.name,
      },
      members: state.members.map((member) =>
        member.isCurrentUser
          ? { ...member, name: displayName, initials: getInitials(displayName) }
          : member,
      ),
      activeToast: showToast('השינויים נשמרו', 'success'),
    }));
  },
  logout() {
    const initialState = createInitialState();

    set({
      ...initialState,
      session: {
        ...initialState.session,
        hasSeenWelcome: true,
      },
      activeToast: showToast('התנתקת מהחשבון', 'info'),
    });
  },
  dismissToast() {
    set({ activeToast: null });
  },
  addShoppingItem(draft) {
    if (!draft.name.trim()) {
      return;
    }

    set((state) => ({
      shoppingItems: addOrUpdatePendingShoppingItem(
        state.shoppingItems,
        draft,
        currentMemberId,
      ),
      activeToast: showToast('נוסף לרשימת הקניות', 'success'),
    }));
  },
  removeShoppingItem(itemId) {
    set((state) => ({
      shoppingItems: state.shoppingItems.filter((item) => item.id !== itemId),
      activeToast: showToast('הפריט הוסר מהרשימה', 'info'),
    }));
  },
  markShoppingPurchased(itemId) {
    const state = get();
    const item = state.shoppingItems.find((entry) => entry.id === itemId);

    if (!item || item.status === 'purchased') {
      return;
    }

    const purchasedAt = new Date().toISOString();
    const existingInventoryItem = state.inventoryItems.find(
      (inventoryItem) =>
        !inventoryItem.archived &&
        normalizeName(inventoryItem.name) === normalizeName(item.name),
    );

    const inventoryItems: InventoryItem[] = existingInventoryItem
      ? state.inventoryItems.map((inventoryItem) =>
          inventoryItem.id === existingInventoryItem.id
            ? {
                ...inventoryItem,
                stockStatus: 'inStock',
                quantityLabel: item.quantityLabel || inventoryItem.quantityLabel,
                note: item.note || inventoryItem.note,
                linkedShoppingItemId: item.id,
                updatedAt: purchasedAt,
                archived: false,
              }
            : inventoryItem,
        )
      : [
          {
            id: createId('inventory'),
            name: item.name,
            quantityLabel: item.quantityLabel,
            note: item.note,
            category: 'בית',
            stockStatus: 'inStock',
            updatedAt: purchasedAt,
            addedById: currentMemberId,
            linkedShoppingItemId: item.id,
          } as InventoryItem,
          ...state.inventoryItems,
        ];

    const shoppingItems: ShoppingItem[] = state.shoppingItems.map((entry) =>
      entry.id === itemId
        ? {
            ...entry,
            status: 'purchased',
            purchasedAt,
            updatedAt: purchasedAt,
          }
        : entry,
    );

    set({
      shoppingItems,
      inventoryItems,
      activeToast: showToast(
        `${item.name} עבר ליש בבית`,
        'success',
        'אפשר לעדכן בהמשך אם הוא כמעט נגמר או נגמר',
      ),
    });
  },
  addInventoryItemToShopping(itemId) {
    const state = get();
    const inventoryItem = state.inventoryItems.find((item) => item.id === itemId);

    if (!inventoryItem) {
      return;
    }

    set({
      shoppingItems: addOrUpdatePendingShoppingItem(
        state.shoppingItems,
        {
          name: inventoryItem.name,
          quantityLabel: inventoryItem.quantityLabel,
          note: inventoryItem.note,
          source: 'inventory',
        },
        currentMemberId,
      ),
      activeToast: showToast('הוחזר לרשימת הקניות', 'success'),
    });
  },
  updateInventoryItem(draft) {
    set((state) => ({
      inventoryItems: state.inventoryItems.map((item) =>
        item.id === draft.id
          ? {
              ...item,
              name: draft.name.trim() || item.name,
              quantityLabel: draft.quantityLabel?.trim(),
              note: draft.note?.trim(),
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
      activeToast: showToast('פרטי הפריט עודכנו', 'success'),
    }));
  },
  setInventoryStatus(itemId, status) {
    set((state) => ({
      inventoryItems: state.inventoryItems.map((item) =>
        item.id === itemId
          ? { ...item, stockStatus: status, updatedAt: new Date().toISOString() }
          : item,
      ),
      activeToast: showToast(
        status === 'lowStock' ? 'עודכן לכמעט נגמר' : 'עודכן ליש בבית',
        'success',
      ),
    }));
  },
  beginOutOfStockFlow(itemId) {
    set({ pendingOutOfStockItemId: itemId });
  },
  cancelOutOfStockFlow() {
    set({ pendingOutOfStockItemId: null });
  },
  resolveOutOfStock(choice) {
    const state = get();
    const itemId = state.pendingOutOfStockItemId;

    if (!itemId) {
      return;
    }

    const currentItem = state.inventoryItems.find((item) => item.id === itemId);

    if (!currentItem) {
      set({ pendingOutOfStockItemId: null });
      return;
    }

    const inventoryItems: InventoryItem[] =
      choice === 'archive'
        ? state.inventoryItems.filter((item) => item.id !== itemId)
        : state.inventoryItems.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  stockStatus: 'outOfStock',
                  updatedAt: new Date().toISOString(),
                }
              : item,
          );

    const shoppingItems: ShoppingItem[] =
      choice === 'returnToShopping'
        ? addOrUpdatePendingShoppingItem(
            state.shoppingItems,
            {
              name: currentItem.name,
              quantityLabel: currentItem.quantityLabel,
              note: currentItem.note,
              source: 'inventory',
            },
            currentMemberId,
          )
        : state.shoppingItems;

    set({
      inventoryItems,
      shoppingItems,
      pendingOutOfStockItemId: null,
      activeToast:
        choice === 'archive'
          ? showToast('הפריט הוסר מהמלאי', 'info')
          : choice === 'returnToShopping'
            ? showToast('הפריט חזר לרשימת הקניות', 'success')
            : showToast('סומן כנגמר', 'warning'),
    });
  },
  createCustomList(title) {
    if (!title.trim()) {
      return;
    }

    set((state) => ({
      customLists: [
        {
          id: createId('list'),
          title: title.trim(),
          subtitle: 'רשימה אישית חדשה',
          kind: 'active',
          accentTone: 'primary',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: [],
        },
        ...state.customLists,
      ],
      activeToast: showToast('נוצרה רשימה חדשה', 'success'),
    }));
  },
  useTemplateList(templateId) {
    const state = get();
    const template = state.customLists.find((list) => list.id === templateId);

    if (!template) {
      return;
    }

    set({
      customLists: [
        {
          ...template,
          id: createId('list'),
          kind: 'active',
          subtitle: `נוצר מתוך ${template.title}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: template.items.map((item) => ({
            ...item,
            id: createId('list-item'),
            isDone: false,
          })),
        },
        ...state.customLists,
      ],
      activeToast: showToast('התבנית נוספה כרשימה פעילה', 'success'),
    });
  },
  toggleCustomListItem(listId, itemId) {
    set((state) => ({
      customLists: state.customLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              updatedAt: new Date().toISOString(),
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, isDone: !item.isDone } : item,
              ),
            }
          : list,
      ),
    }));
  },
  addCustomListItem(listId, title) {
    if (!title.trim()) {
      return;
    }

    set((state) => ({
      customLists: state.customLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              updatedAt: new Date().toISOString(),
              items: [
                ...list.items,
                {
                  id: createId('list-item'),
                  title: title.trim(),
                  isDone: false,
                },
              ],
            }
          : list,
      ),
      activeToast: showToast('הפריט נוסף לרשימה', 'success'),
    }));
  },
  saveGift(draft) {
    if (!draft.title.trim() || !draft.recipient.trim()) {
      return;
    }

    set((state) => {
      const now = new Date().toISOString();

      if (draft.id) {
        return {
          gifts: state.gifts.map((gift) =>
            gift.id === draft.id
              ? {
                  ...gift,
                  title: draft.title.trim(),
                  recipient: draft.recipient.trim(),
                  event: draft.event.trim() || 'ללא אירוע',
                  notes: draft.notes?.trim(),
                  updatedAt: now,
                }
              : gift,
          ),
          activeToast: showToast('הרעיון עודכן', 'success'),
        };
      }

      return {
        gifts: [
          {
            id: createId('gift'),
            title: draft.title.trim(),
            recipient: draft.recipient.trim(),
            event: draft.event.trim() || 'אירוע קרוב',
            notes: draft.notes?.trim(),
            status: 'idea',
            createdAt: now,
            updatedAt: now,
          },
          ...state.gifts,
        ],
        activeToast: showToast('נוסף רעיון למתנה', 'success'),
      };
    });
  },
  markGiftPurchased(giftId) {
    set((state) => ({
      gifts: state.gifts.map((gift) =>
        gift.id === giftId
          ? { ...gift, status: 'purchased', updatedAt: new Date().toISOString() }
          : gift,
      ),
      activeToast: showToast('המתנה סומנה כנקנתה', 'success'),
    }));
  },
  sendGiftToShopping(giftId) {
    const state = get();
    const gift = state.gifts.find((entry) => entry.id === giftId);

    if (!gift) {
      return;
    }

    set({
      shoppingItems: addOrUpdatePendingShoppingItem(
        state.shoppingItems,
        {
          name: gift.title,
          note: `עבור ${gift.recipient}`,
          source: 'gift',
        },
        currentMemberId,
      ),
      activeToast: showToast('המתנה נוספה לקניות', 'success'),
    });
  },
  saveTask(draft) {
    if (!draft.title.trim()) {
      return;
    }

    set((state) => {
      const now = new Date().toISOString();

      if (draft.id) {
        return {
          tasks: state.tasks.map((task) =>
            task.id === draft.id
              ? {
                  ...task,
                  title: draft.title.trim(),
                  assignedMemberId: draft.assignedMemberId,
                  dueDate: draft.dueDate?.trim(),
                  updatedAt: now,
                }
              : task,
          ),
          activeToast: showToast('המשימה עודכנה', 'success'),
        };
      }

      return {
        tasks: [
          {
            id: createId('task'),
            title: draft.title.trim(),
            assignedMemberId: draft.assignedMemberId,
            dueDate: draft.dueDate?.trim(),
            status: 'open',
            createdAt: now,
            updatedAt: now,
          },
          ...state.tasks,
        ],
        activeToast: showToast('נוספה משימה חדשה', 'success'),
      };
    });
  },
  toggleTaskStatus(taskId) {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'open' ? 'completed' : 'open',
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
      activeToast: showToast('סטטוס המשימה עודכן', 'success'),
    }));
  },
  addMember(draft) {
    if (!draft.name.trim()) {
      return;
    }

    set((state) => ({
      members: [
        ...state.members,
        {
          id: createId('member'),
          name: draft.name.trim(),
          role: draft.role,
          initials: getInitials(draft.name),
          tint: '#F2ECE4',
        },
      ],
      activeToast: showToast('חבר בית נוסף', 'success', 'אפשר לשתף איתו קוד הזמנה'),
    }));
  },
}));
