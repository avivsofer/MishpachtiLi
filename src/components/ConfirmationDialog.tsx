import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { rtlText, rtlView, theme } from '../theme';
import { PrimaryButton, SecondaryButton } from './Buttons';

type ConfirmationDialogProps = {
  visible: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  tone?: 'default' | 'danger';
};

export function ConfirmationDialog({
  visible,
  title,
  description,
  confirmLabel,
  cancelLabel = 'ביטול',
  onConfirm,
  onCancel,
  tone = 'default',
}: ConfirmationDialogProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onCancel}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onCancel} style={styles.backdrop} />
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.actions}>
            <SecondaryButton label={cancelLabel} onPress={onCancel} fullWidth />
            <PrimaryButton
              fullWidth
              label={confirmLabel}
              onPress={onConfirm}
              icon={tone === 'danger' ? 'alert-circle-outline' : undefined}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.overlay,
    paddingHorizontal: theme.spacing.xl,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    ...rtlView,
    width: '100%',
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  title: {
    ...theme.typography.section,
    ...rtlText,
    color: theme.colors.textPrimary,
  },
  description: {
    ...theme.typography.body,
    ...rtlText,
    color: theme.colors.textSecondary,
  },
  actions: {
    gap: theme.spacing.md,
  },
});
