import type {
  GiftStatus,
  MemberRole,
  StockStatus,
  TaskStatus,
} from '../types/domain';
import type { Tone } from '../types/ui';

export const stockStatusMeta: Record<
  StockStatus,
  { label: string; tone: Tone }
> = {
  inStock: { label: 'יש בבית', tone: 'success' },
  lowStock: { label: 'כמעט נגמר', tone: 'warning' },
  outOfStock: { label: 'נגמר', tone: 'danger' },
};

export const giftStatusMeta: Record<GiftStatus, { label: string; tone: Tone }> = {
  idea: { label: 'רעיון', tone: 'neutral' },
  planned: { label: 'בתכנון', tone: 'accent' },
  purchased: { label: 'נקנה', tone: 'success' },
};

export const taskStatusMeta: Record<TaskStatus, { label: string; tone: Tone }> = {
  open: { label: 'פתוחה', tone: 'warning' },
  completed: { label: 'הושלמה', tone: 'success' },
};

export const memberRoleTone: Record<MemberRole, Tone> = {
  הורה: 'primary',
  ילד: 'accent',
  אורח: 'neutral',
};
