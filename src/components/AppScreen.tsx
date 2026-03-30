import type { PropsWithChildren, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { rtlView, theme } from '../theme';

type AppScreenProps = PropsWithChildren<{
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backgroundDecor?: ReactNode;
}>;

export function AppScreen({
  children,
  scrollable = true,
  contentContainerStyle,
  backgroundDecor,
}: AppScreenProps) {
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.content, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {backgroundDecor ? <View style={styles.decor}>{backgroundDecor}</View> : null}
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    ...rtlView,
  },
  decor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    ...rtlView,
    paddingHorizontal: theme.layout.screenPadding,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.layout.tabBarHeight + theme.spacing.hero,
    gap: theme.spacing.xxl,
  },
});
