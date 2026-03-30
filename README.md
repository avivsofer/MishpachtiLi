# משפחתילי

שלד אפליקציה ל־React Native + Expo + TypeScript עבור עוזר בית משפחתי משותף, RTL-first בעברית.

## מה כבר קיים

- ניווט היררכי עם `React Navigation`: `Root stack` ל־Splash/Welcome/Auth/Setup ו־`App stack` עם bottom tabs ו־screens פנימיים.
- `Zustand` כ־domain store מקומי עם seed data עברי ופעולות typed.
- `Zustand persist` עם `AsyncStorage` עבור שמירה מקומית דקה של state durable בין הפעלות.
- RTL מהיום הראשון: `I18nManager` מופעל באתחול, `NavigationContainer` רץ ב־`direction="rtl"`, ורכיבי layout משתמשים ב־helpers לוגיים מתוך `src/theme/index.ts`.
- design system מרוכז ב־`src/theme/index.ts` עם semantic tokens לצבעים, spacing, radius, typography ו־shadows.
- רכיבי UI reusable ב־`src/components` עבור buttons, headers, chips, cards, empty states, modal sheet ו־toast.
- selectors של Zustand נשארים על raw references בלבד, וכל filtering / grouping / summaries נגזרים בתוך `useMemo` ברמת המסך כדי להימנע מ־snapshot loops.

## מבנה הפרויקט

```text
src/
  app/          providers + app root
  components/   reusable UI building blocks
  data/         Hebrew seed data
  navigation/   root/app/tab navigators
  screens/      all product screens
  store/        Zustand store + selectors
  theme/        tokens and navigation theme
  types/        domain and UI types
  utils/        formatters and status helpers
```

## המסכים שנבנו

- Splash
- Welcome
- Auth
- Household Setup
- Home Dashboard
- Shopping List
- Inventory
- Lists
- Single List
- Gifts
- Tasks
- Household Members
- Settings
- More

## הלוגיקה המוצרית שכבר מחוברת

- פריט שנוסף לקניות ונלחץ כ־`נרכש` עובר אוטומטית גם ל־inventory.
- פריט ב־inventory יכול להתעדכן ל־`יש בבית`, `כמעט נגמר`, או `נגמר`.
- סימון `נגמר` פותח sheet עם שלוש אפשרויות: חזרה לקניות, השארה כנגמר, או הסרה מהמלאי.
- אפשר להחזיר פריט מהמלאי לרשימת הקניות גם ידנית.
- מתנה יכולה להפוך לפריט קנייה.
- משימות, רשימות ובני בית נשמרים כולם באותו store typed ומבוססי seed data עקבי.

## איך להריץ

```bash
npm install
npm run start
```

לבדיקת טיפוסים:

```bash
npm run typecheck
```

## גבולות ה־MVP הנוכחי

- האפליקציה מקומית בלבד כרגע: יש persistence מקומי, אבל אין sync, multi-device או backend.
- ה־store ב־`src/store/useAppStore.ts` מרכז עדיין את ה־domain actions, אבל המבנה הנוכחי כבר שומר על typed models ו־shared helpers שנוח לפרק בהמשך.
- Sheets, dialogs ו־toasts הם client-side בלבד ונועדו לזרימת MVP מקומית.
- state זמני כמו toast פעיל או modal פתוח לא נשמר ונבנה מחדש בכל פתיחה, בכוונה.

## איפה לחבר backend בהמשך

- השכבה הבאה היא להפריד את ה־persisted store מ־API/repository boundary, בלי לשנות את ה־screen contracts.
- לפרק את `src/store/useAppStore.ts` ל־slices או domain modules קטנים סביב shopping / inventory / lists / gifts / tasks, בלי לשנות את types וה־selectors היציבים.
- להעביר כתיבה וקריאה ל־API-ready actions או repositories, כך שה־screens יישארו מול intent-level actions בלבד.
- לחבר auth אמיתי במקום submit מקומי במסך `src/screens/AuthScreen.tsx`.
- להחליף invite code/mock household setup בזרימה אמיתית מול backend.
- להוסיף בדיקות בסיסיות: store action tests, utility tests, ו־screen smoke tests לזרימות הליבה של shopping → inventory.
