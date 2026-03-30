import { DefaultTheme, type Theme } from '@react-navigation/native';
import { I18nManager, type TextStyle, type ViewStyle } from 'react-native';

export const theme = {
  colors: {
    background: '#F6F1EA',
    backgroundElevated: '#FCF8F3',
    surface: '#FFFDFC',
    surfaceWarm: '#FBF6F0',
    surfaceMuted: '#F2ECE4',
    surfaceStrong: '#E8DDD1',
    primary: '#295E64',
    primarySoft: '#DDE9E7',
    primaryBorder: '#C6D9D7',
    accent: '#C9856B',
    accentSoft: '#F4E3DC',
    accentBorder: '#E7C8BA',
    success: '#6E8D73',
    successSoft: '#E4ECE3',
    successBorder: '#C9D8CC',
    warning: '#D1A05B',
    warningSoft: '#F7EDD9',
    warningBorder: '#E7D1AA',
    danger: '#C96F61',
    dangerSoft: '#F6E0DB',
    dangerBorder: '#E6BDB5',
    textPrimary: '#2E322F',
    textSecondary: '#666B66',
    textMuted: '#8C8F88',
    border: '#E8DED4',
    divider: '#EFE6DD',
    overlay: 'rgba(33, 29, 24, 0.28)',
    shadow: '#1F2A2A',
    white: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    hero: 40,
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 28,
    pill: 999,
  },
  typography: {
    hero: {
      fontSize: 34,
      lineHeight: 42,
      fontWeight: '700',
      letterSpacing: -0.7,
    } as TextStyle,
    title: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '700',
      letterSpacing: -0.4,
    } as TextStyle,
    section: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '700',
    } as TextStyle,
    cardTitle: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '700',
    } as TextStyle,
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    } as TextStyle,
    bodyStrong: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    } as TextStyle,
    label: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600',
    } as TextStyle,
    meta: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '500',
    } as TextStyle,
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
    } as TextStyle,
    button: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '700',
    } as TextStyle,
  },
  iconSize: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  },
  shadow: {
    card: {
      shadowColor: '#1F2A2A',
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 10 },
      elevation: 4,
    } as ViewStyle,
    soft: {
      shadowColor: '#1F2A2A',
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    } as ViewStyle,
    floating: {
      shadowColor: '#1F2A2A',
      shadowOpacity: 0.14,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    } as ViewStyle,
  },
  layout: {
    screenPadding: 20,
    touchTarget: 48,
    tabBarHeight: 78,
  },
} as const;

export const rtlText = {
  textAlign: 'right' as const,
  writingDirection: 'rtl' as const,
};

export const ltrText = {
  textAlign: 'left' as const,
  writingDirection: 'ltr' as const,
};

export const rtlRow = {
  flexDirection: I18nManager.isRTL
    ? ('row-reverse' as ViewStyle['flexDirection'])
    : ('row' as ViewStyle['flexDirection']),
};

export const rtlView = {
  direction: 'rtl' as const,
};

export const navigationTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.textPrimary,
    border: theme.colors.border,
    notification: theme.colors.accent,
  },
};
