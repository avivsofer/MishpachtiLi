import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import type { KeyboardTypeOptions, TextInputProps } from 'react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  logicalRow,
  logicalText,
  logicalTextBlock,
  ltrText,
  textForDirection,
  theme,
} from '../theme';
import { PrimaryButton } from './Buttons';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type TextFieldProps = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  direction?: 'rtl' | 'ltr';
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
};

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  multiline,
  direction = 'rtl',
  keyboardType,
  autoCapitalize = 'sentences',
  autoCorrect,
}: TextFieldProps) {
  return (
    <View style={styles.fieldWrapper}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <TextInput
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          direction === 'ltr' ? styles.inputLtr : styles.inputRtl,
          multiline && styles.multilineInput,
        ]}
        textAlign={direction === 'ltr' ? 'left' : 'right'}
        value={value}
      />
    </View>
  );
}

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export function SearchField({
  value,
  onChangeText,
  placeholder = 'חיפוש',
}: SearchFieldProps) {
  return (
    <View style={styles.searchWrapper}>
      <View style={styles.searchIconBubble}>
        <MaterialCommunityIcons
          color={theme.colors.primary}
          name="magnify"
          size={18}
        />
      </View>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        returnKeyType="search"
        style={styles.searchInput}
        textAlign="right"
        value={value}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} style={styles.searchClear}>
          <MaterialCommunityIcons
            color={theme.colors.textMuted}
            name="close"
            size={16}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

type QuickAddBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  actionLabel: string;
  onSubmit: () => void;
  secondaryValue?: string;
  onSecondaryChangeText?: (value: string) => void;
  secondaryPlaceholder?: string;
  title?: string;
  description?: string;
  icon?: IconName;
  variant?: 'default' | 'hero';
  submitDisabled?: boolean;
};

export function QuickAddBar({
  value,
  onChangeText,
  placeholder,
  actionLabel,
  onSubmit,
  secondaryValue,
  onSecondaryChangeText,
  secondaryPlaceholder,
  title,
  description,
  icon = 'plus-circle-outline',
  variant = 'default',
  submitDisabled,
}: QuickAddBarProps) {
  const hero = variant === 'hero';

  return (
    <View style={[styles.quickAddWrapper, hero && styles.quickAddWrapperHero]}>
      {title || description ? (
        <View style={styles.quickAddHeader}>
          <View style={[styles.quickAddIcon, hero && styles.quickAddIconHero]}>
            <MaterialCommunityIcons
              color={theme.colors.primary}
              name={icon}
              size={hero ? 22 : 18}
            />
          </View>
          <View style={styles.quickAddCopy}>
            {title ? <Text style={styles.quickAddTitle}>{title}</Text> : null}
            {description ? (
              <Text style={styles.quickAddDescription}>{description}</Text>
            ) : null}
          </View>
        </View>
      ) : null}

      <View style={[styles.quickAddComposer, hero && styles.quickAddComposerHero]}>
        <View style={styles.quickAddInputs}>
          <TextInput
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            returnKeyType="done"
            style={[styles.quickInput, hero && styles.quickInputHero]}
            textAlign="right"
            value={value}
          />
          {onSecondaryChangeText ? (
            <TextInput
              onChangeText={onSecondaryChangeText}
              onSubmitEditing={onSubmit}
              placeholder={secondaryPlaceholder}
              placeholderTextColor={theme.colors.textMuted}
              returnKeyType="done"
              style={[styles.quickInputSecondary, hero && styles.quickInputSecondaryHero]}
              textAlign="right"
              value={secondaryValue}
            />
          ) : null}
        </View>
        <PrimaryButton
          disabled={submitDisabled}
          icon="plus"
          label={actionLabel}
          onPress={onSubmit}
          size={hero ? 'default' : 'small'}
        />
      </View>
    </View>
  );
}

type ChoiceChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  count?: number;
  icon?: IconName;
};

export function ChoiceChip({
  label,
  selected,
  onPress,
  count,
  icon,
}: ChoiceChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.choiceChip,
        selected && styles.choiceChipSelected,
        pressed && styles.choiceChipPressed,
      ]}
    >
      {icon ? (
        <MaterialCommunityIcons
          color={selected ? theme.colors.primary : theme.colors.textSecondary}
          name={icon}
          size={14}
        />
      ) : null}
      <Text
        numberOfLines={1}
        style={[styles.choiceChipLabel, selected && styles.choiceChipLabelSelected]}
      >
        {label}
      </Text>
      {typeof count === 'number' ? (
        <View style={[styles.choiceChipCount, selected && styles.choiceChipCountSelected]}>
          <Text
            style={[
              styles.choiceChipCountLabel,
              selected && styles.choiceChipCountLabelSelected,
            ]}
          >
            {count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fieldWrapper: {
    gap: theme.spacing.sm,
  },
  fieldLabel: {
    ...theme.typography.label,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  input: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  inputRtl: {
    ...textForDirection('rtl'),
  },
  inputLtr: {
    ...ltrText,
  },
  multilineInput: {
    minHeight: 96,
    paddingTop: theme.spacing.lg,
    textAlignVertical: 'top',
  },
  searchWrapper: {
    ...logicalRow,
    alignItems: 'center',
    gap: theme.spacing.sm,
    minHeight: 56,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadow.soft,
  },
  searchIconBubble: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySoft,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.textPrimary,
    ...theme.typography.body,
    ...textForDirection('rtl'),
  },
  searchClear: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
  },
  quickAddWrapper: {
    gap: theme.spacing.md,
  },
  quickAddWrapperHero: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surfaceWarm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    ...theme.shadow.soft,
  },
  quickAddHeader: {
    ...logicalRow,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  quickAddIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySoft,
  },
  quickAddIconHero: {
    width: 46,
    height: 46,
    borderRadius: 16,
  },
  quickAddCopy: {
    flex: 1,
    gap: theme.spacing.xs,
    alignItems: 'stretch',
  },
  quickAddTitle: {
    ...theme.typography.bodyStrong,
    ...logicalTextBlock,
    color: theme.colors.textPrimary,
  },
  quickAddDescription: {
    ...theme.typography.meta,
    ...logicalTextBlock,
    color: theme.colors.textSecondary,
  },
  quickAddComposer: {
    gap: theme.spacing.md,
  },
  quickAddComposerHero: {
    gap: theme.spacing.lg,
  },
  quickAddInputs: {
    ...logicalRow,
    gap: theme.spacing.sm,
  },
  quickInput: {
    flex: 1,
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.textPrimary,
    ...theme.typography.body,
    ...textForDirection('rtl'),
  },
  quickInputHero: {
    minHeight: 56,
    backgroundColor: theme.colors.backgroundElevated,
  },
  quickInputSecondary: {
    width: 110,
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.textPrimary,
    ...theme.typography.body,
    ...logicalText,
  },
  quickInputSecondaryHero: {
    width: 116,
    minHeight: 56,
    backgroundColor: theme.colors.backgroundElevated,
  },
  choiceChip: {
    ...logicalRow,
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  choiceChipSelected: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primaryBorder,
  },
  choiceChipPressed: {
    opacity: 0.9,
  },
  choiceChipLabel: {
    ...theme.typography.label,
    ...logicalText,
    flexShrink: 1,
    color: theme.colors.textSecondary,
  },
  choiceChipLabelSelected: {
    color: theme.colors.primary,
  },
  choiceChipCount: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
  },
  choiceChipCountSelected: {
    backgroundColor: theme.colors.white,
  },
  choiceChipCountLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  choiceChipCountLabelSelected: {
    color: theme.colors.primary,
  },
});
