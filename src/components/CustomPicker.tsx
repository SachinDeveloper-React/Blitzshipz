import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
} from 'react-native';
// import { ChevronDown } from 'lucide-react-native';
import CustomText from './CustomText';
import {ChevronDown} from 'lucide-react-native';

type PickerItem = {
  label: string;
  value: string;
};

type CustomPickerProps = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
};

const CustomPicker: React.FC<CustomPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  items,
  error,
  errorMessage,
  leftIcon,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.container, error ? styles.errorBorder : {}]}
        onPress={() => setModalVisible(true)}>
        <CustomText variant="caption" style={styles.label}>
          {label}
        </CustomText>

        <View style={styles.valueRow}>
          <View style={[styles.valueRow, {gap: 5}]}>
            {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
            <CustomText style={styles.valueText}>
              {items.find(item => item.value === selectedValue)?.label ||
                'Select'}
            </CustomText>
          </View>
          <ChevronDown size={18} color="#333" />
        </View>
      </TouchableOpacity>

      {errorMessage && (
        <CustomText variant="caption" style={styles.errorText}>
          {errorMessage}
        </CustomText>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedValue === item.value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                  activeOpacity={0.8}>
                  <CustomText
                    style={[
                      styles.optionText,
                      selectedValue === item.value && styles.selectedOptionText,
                    ]}>
                    {item.label}
                  </CustomText>
                  {selectedValue === item.value && (
                    <View style={styles.checkmarkContainer}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  errorBorder: {
    borderColor: 'red',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#333',
  },
  icon: {marginHorizontal: 5},
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    paddingBottom: 100,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  optionText: {
    fontSize: 16,
    color: '#333',
  },

  selectedOption: {
    backgroundColor: '#041C2F',
    borderColor: '#fff',
  },

  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  checkmarkContainer: {
    backgroundColor: '#00acc1',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomPicker;
