import type { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { logicalTextBlock, logicalView, theme } from '../theme';

type ModalSheetProps = PropsWithChildren<{
  visible: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
}>;

export function ModalSheet({
  visible,
  title,
  subtitle,
  onClose,
  children,
}: ModalSheetProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.overlay,
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    ...logicalView,
    backgroundColor: theme.colors.backgroundElevated,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingHorizontal: theme.spacing.xxl,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.xl,
  },
  handle: {
    alignSelf: 'center',
    width: 56,
    height: 5,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceStrong,
  },
  header: {
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.section,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
  content: {
    gap: theme.spacing.lg,
  },
});
