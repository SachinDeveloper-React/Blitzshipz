import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  date: {
    fromDate: DateType;
    toDate: DateType;
  };
  onSelect: (startDate: DateType, endDate: DateType) => void;
  title?: string;
  loading?: boolean;
};

const CustomDatePickerModal: React.FC<Props> = ({
  visible,
  onClose,
  date,
  onSelect,
  title,
  onSubmit,
  loading = false,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title || 'Select Date'}</Text>

          <DateTimePicker
            mode="range"
            startDate={date.fromDate}
            endDate={date.toDate}
            onChange={({startDate, endDate}) => onSelect(startDate, endDate)}
            maxDate={new Date()}
            disabledDates={current => current! > new Date()}
            styles={{
              selected: {
                backgroundColor: '#184ea3',
                borderRadius: 8,
              },
              selected_label: {
                color: '#fff',
              },

              button_prev: {
                color: '#000',
                tintColor: '#000',
                borderRadius: 4,
              },
              button_next: {
                color: '#000',
                tintColor: '#000',
                borderRadius: 4,
              },
              disabled: {
                backgroundColor: '#f0f0f0',
              },
              disabled_label: {
                color: '#ccc',
              },
            }}
          />

          <TouchableOpacity
            style={styles.doneButton}
            onPress={onSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.doneButtonText}>Done</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              onSelect(null, null);
              onClose();
            }}>
            <Text style={styles.doneButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDatePickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: moderateScale(16),
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
  },
  modalTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  doneButton: {
    marginTop: moderateScale(12),
    backgroundColor: '#184ea3',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  clearButton: {
    marginTop: moderateScale(12),
    backgroundColor: 'red',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
