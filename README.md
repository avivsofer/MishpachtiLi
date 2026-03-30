# משפחתילי

שלד אפליקציה ל־React Native + Expo + TypeScript עבור עוזר בית משפחתי משותף, RTL-first בעברית.

## מה כבר קיים

- ניווט היררכי עם `React Navigation`: `Root stack` ל־Splash/Welcome/Auth/Setup ו־`App stack` עם bottom tabs ו־screens פנימיים.
- `Zustand` כ־domain store מקומי עם seed data עברי ופעולות typed.
- RTL מהיום הראשון: `NavigationContainer` ב־`direction="rtl"`, layoutים ב־`row-reverse`, טקסטים מיושרים לימין ו־Hebrew-first microcopy.
- design system מרוכז ב־`src/theme/index.ts` עם semantic tokens לצבעים, spacing, radius, typography ו־shadows.
- רכיבי UI reusable ב־`src/components` עבור buttons, headers, chips, cards, empty states, modal sheet ו־toast.

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

## איפה לחבר backend בהמשך

- להחליף את seed data ב־repository/service layer נפרד ולחבר `TanStack Query` או data client דומה.
- לפרק את `src/store/useAppStore.ts` ל־actions async מול API, תוך שמירה על selectors ו־domain types הקיימים.
- לחבר auth אמיתי במקום submit מקומי במסך `src/screens/AuthScreen.tsx`.
- להחליף invite code/mock household setup בזרימה אמיתית מול backend.
