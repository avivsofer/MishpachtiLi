export const shortDateFormatter = new Intl.DateTimeFormat('he-IL', {
  day: 'numeric',
  month: 'long',
});

export const compactDateFormatter = new Intl.DateTimeFormat('he-IL', {
  day: 'numeric',
  month: 'numeric',
});

export function normalizeName(value: string) {
  return value.trim().toLocaleLowerCase('he-IL');
}

export function formatShortDate(dateString?: string) {
  if (!dateString) {
    return '';
  }

  return shortDateFormatter.format(new Date(dateString));
}

export function formatDueDate(dateString?: string) {
  if (!dateString) {
    return 'ללא תאריך';
  }

  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(date, today)) {
    return 'היום';
  }

  if (sameDay(date, tomorrow)) {
    return 'מחר';
  }

  return compactDateFormatter.format(date);
}

export function isToday(dateString?: string) {
  if (!dateString) {
    return false;
  }

  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour < 12) {
    return 'בוקר נעים';
  }

  if (hour < 17) {
    return 'צהריים רגועים';
  }

  return 'ערב טוב';
}

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('');
}

export function formatProgress(doneCount: number, totalCount: number) {
  if (totalCount === 0) {
    return '0%';
  }

  return `${Math.round((doneCount / totalCount) * 100)}%`;
}
