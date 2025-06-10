import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import CustomText from './CustomText';

type CustomSelectableProps = TextInputProps & {
  label: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onPress?: () => void;
};

const CustomSelectable: React.FC<CustomSelectableProps> = ({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  error,
  errorMessage,
  value,
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[
          error ? styles.errorContainer : styles.container,
          isFocused && styles.focusedContainer,
        ]}>
        <CustomText variant="caption" style={styles.label}>
          {label}
        </CustomText>

        <View style={styles.inputWrapper}>
          <View style={styles.icon}>{leftIcon}</View>

          <CustomText style={styles.input}>{value}</CustomText>

          {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
      {errorMessage && (
        <CustomText variant="caption" style={{color: 'red', marginTop: 5}}>
          {errorMessage}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 12,
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
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomSelectable;
