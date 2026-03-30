export type ID = string;

export type ShoppingItemSource = 'manual' | 'inventory' | 'gift' | 'template';
export type ShoppingItemStatus = 'pending' | 'purchased';
export type StockStatus = 'inStock' | 'lowStock' | 'outOfStock';
export type ListKind = 'template' | 'active';
export type GiftStatus = 'idea' | 'planned' | 'purchased';
export type TaskStatus = 'open' | 'completed';
export type MemberRole = 'הורה' | 'ילד' | 'אורח';
export type ToastTone = 'success' | 'info' | 'warning';

export interface SessionState {
  hasSeenWelcome: boolean;
  isAuthenticated: boolean;
  householdReady: boolean;
  displayName: string;
}

export interface Household {
  id: ID;
  name: string;
  inviteCode: string;
  city?: string;
}

export interface HouseholdMember {
  id: ID;
  name: string;
  role: MemberRole;
  initials: string;
  tint: string;
  isCurrentUser?: boolean;
}

export interface ShoppingItem {
  id: ID;
  name: string;
  quantityLabel?: string;
  note?: string;
  addedById: ID;
  status: ShoppingItemStatus;
  source: ShoppingItemSource;
  createdAt: string;
  updatedAt: string;
  purchasedAt?: string;
}

export interface InventoryItem {
  id: ID;
  name: string;
  quantityLabel?: string;
  note?: string;
  category: string;
  stockStatus: StockStatus;
  updatedAt: string;
  addedById: ID;
  archived?: boolean;
  linkedShoppingItemId?: ID;
}

export interface CustomListItem {
  id: ID;
  title: string;
  isDone: boolean;
}

export interface CustomList {
  id: ID;
  title: string;
  subtitle: string;
  kind: ListKind;
  accentTone: 'primary' | 'accent' | 'success';
  items: CustomListItem[];
  createdAt: string;
  updatedAt: string;
}

export interface GiftItem {
  id: ID;
  recipient: string;
  event: string;
  title: string;
  status: GiftStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskItem {
  id: ID;
  title: string;
  assignedMemberId: ID;
  dueDate?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ToastMessage {
  id: ID;
  title: string;
  description?: string;
  tone: ToastTone;
}

export interface HouseholdSetupPayload {
  mode: 'create' | 'join';
  householdName?: string;
  inviteCode?: string;
}

export interface ShoppingDraft {
  name: string;
  quantityLabel?: string;
  note?: string;
  source?: ShoppingItemSource;
}

export interface InventoryDraft {
  id: ID;
  name: string;
  quantityLabel?: string;
  note?: string;
}

export interface GiftDraft {
  id?: ID;
  recipient: string;
  event: string;
  title: string;
  notes?: string;
}

export interface TaskDraft {
  id?: ID;
  title: string;
  assignedMemberId: ID;
  dueDate?: string;
}

export interface MemberDraft {
  name: string;
  role: MemberRole;
}

export type OutOfStockChoice = 'returnToShopping' | 'keepOut' | 'archive';
