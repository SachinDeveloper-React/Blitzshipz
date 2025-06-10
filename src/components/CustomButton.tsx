import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  GestureResponderEvent,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

type CustomButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textSize?: number;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  textSize,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
      ]}
      activeOpacity={0.7}
      {...props}>
      <View style={styles.content}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? '#000' : '#fff'} />
        ) : (
          <Text
            style={[
              textSize ? {fontSize: textSize} : styles.text,
              variant === 'outline' && styles.textOutline,
              variant === 'secondary' && styles.textSecondary,
            ]}>
            {title}
          </Text>
        )}
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {backgroundColor: '#0a2f50'},
  secondary: {backgroundColor: '#fec201'},
  outline: {
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  danger: {backgroundColor: '#FF3B30'},

  small: {paddingVertical: 8, paddingHorizontal: 12},
  medium: {paddingVertical: 12, paddingHorizontal: 16},
  large: {paddingVertical: 16, paddingHorizontal: 20},

  fullWidth: {width: '100%'},

  disabled: {opacity: 0.5},

  text: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  textOutline: {color: '#007AFF'},
  textSecondary: {color: '#000'},

  content: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginHorizontal: 5},
});

export default CustomButton;
