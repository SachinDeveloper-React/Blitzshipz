import React, {useState, forwardRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import CustomText from './CustomText';

type CustomTextInputProps = TextInputProps & {
  label: string;
  error?: boolean;
  errorMessage?: string;
  countryCode?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  disabled?: boolean;
};

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      countryCode = '+91',
      leftIcon,
      rightIcon,
      onRightIconPress,
      error,
      errorMessage,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View>
        <View
          style={[
            error
              ? styles.errorContainer
              : disabled
              ? styles.disabledContainer
              : styles.container,
            isFocused && styles.focusedContainer,
          ]}>
          <CustomText variant="caption" style={styles.label}>
            {label}
          </CustomText>

          <View style={styles.inputWrapper}>
            {leftIcon ? (
              <View style={styles.icon}>{leftIcon}</View>
            ) : (
              <CustomText style={styles.countryCode}>{countryCode}</CustomText>
            )}

            <TextInput
              {...props}
              ref={ref}
              style={styles.input}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {rightIcon && (
              <TouchableOpacity onPress={onRightIconPress}>
                {rightIcon}
              </TouchableOpacity>
            )}
          </View>
        </View>
        {errorMessage && (
          <CustomText variant="caption" style={{color: 'red', marginTop: 5}}>
            {errorMessage}
          </CustomText>
        )}
      </View>
    );
  },
);

// export default CustomTextInput;

const styles = StyleSheet.create({
  errorContainer: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'relative',
  },
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'relative',
  },
  disabledContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'relative',
    backgroundColor: '#eee',
  },
  focusedContainer: {
    // borderColor: '#007AFF',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomTextInput;
