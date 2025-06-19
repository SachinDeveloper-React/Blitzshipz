import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import {Calendar} from 'lucide-react-native';
import {categories} from './helper';

type Props = {
  visible: boolean;
  onClose: () => void;
  onApplyFilter: (filters: {
    category: string | null;
    subCategory: string;
    createdDateFrom: string | DateType;
    createdDateTo: string | DateType;
  }) => void;
  onResetFilter: () => void;
};

const FilterTicketModel = ({
  onClose,
  visible,
  onApplyFilter,
  onResetFilter,
}: Props) => {
  const defaultStyles = useDefaultStyles();

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<DateType>();
  const [fromDate, setFromDate] = useState<DateType>();
  const [toDate, setToDate] = useState<DateType>();
  const [activeDateField, setActiveDateField] = useState<'from' | 'to' | null>(
    null,
  );

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [categoryItems, setCategoryItems] = useState(
    categories.map(cat => ({
      label: cat.title,
      value: cat.title,
    })),
  );

  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [subCategoryItems, setSubCategoryItems] = useState<
    {label: string; value: string}[]
  >([]);
  useEffect(() => {
    if (!selectedCategory) {
      setSubCategoryItems([]);
      setSelectedSubCategory(null);
      return;
    }

    const categoryObj = categories.find(c => c.title === selectedCategory);
    const list = categoryObj?.list ?? [];

    setSubCategoryItems(list.map(item => ({label: item, value: item})));
    setSelectedSubCategory(null);
  }, [selectedCategory]);

  const formatDate = (date?: DateType) => {
    if (!date || !(date instanceof Date)) return 'DD/MM/YYYY';
    return date.toLocaleDateString('en-GB');
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalWrapper}>
          <Pressable style={styles.modalOverlay} onPress={onClose} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardAvoiding}>
            <View style={styles.modalContent}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                  <Text style={styles.label}>Category</Text>
                  <DropDownPicker
                    placeholder="Select Category"
                    open={categoryOpen}
                    value={selectedCategory}
                    items={categoryItems}
                    setOpen={setCategoryOpen}
                    setValue={setSelectedCategory}
                    setItems={setCategoryItems}
                    zIndex={3000}
                    zIndexInverse={1000}
                  />

                  <View style={{marginTop: 16}}>
                    <Text style={styles.label}>Sub Category</Text>
                    <DropDownPicker
                      placeholder="Select Sub Category"
                      open={subCategoryOpen}
                      value={selectedSubCategory}
                      items={subCategoryItems}
                      setOpen={setSubCategoryOpen}
                      setValue={setSelectedSubCategory}
                      setItems={setSubCategoryItems}
                      disabled={!selectedCategory}
                      zIndex={2000}
                      zIndexInverse={2000}
                    />
                  </View>

                  <View style={{marginTop: 20}}>
                    <Text style={styles.label}>From Date</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => {
                        setTempDate(fromDate);
                        setActiveDateField('from');
                        setIsDatePickerVisible(true);
                      }}
                      activeOpacity={0.7}>
                      <View style={styles.dateRow}>
                        <Text style={{color: fromDate ? '#000' : '#999'}}>
                          {formatDate(fromDate)}
                        </Text>
                        <Calendar />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 20}}>
                    <Text style={styles.label}>To Date</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => {
                        setTempDate(toDate);
                        setActiveDateField('to');
                        setIsDatePickerVisible(true);
                      }}
                      activeOpacity={0.7}>
                      <View style={styles.dateRow}>
                        <Text style={{color: toDate ? '#000' : '#999'}}>
                          {formatDate(toDate)}
                        </Text>
                        <Calendar />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* Action Buttons */}
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={[styles.actionButton, {backgroundColor: '#ccc'}]}
                      onPress={() => {
                        onResetFilter();
                        setFromDate(undefined);
                        setToDate(undefined);
                        setTempDate(undefined);
                        onClose();
                      }}>
                      <Text style={styles.actionButtonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {backgroundColor: '#007AFF'},
                      ]}
                      onPress={() => {
                        onApplyFilter({
                          category: selectedCategory,
                          subCategory: selectedSubCategory ?? '',
                          createdDateFrom: fromDate,
                          createdDateTo: toDate,
                        });

                        onClose();
                      }}>
                      <Text style={[styles.actionButtonText, {color: '#fff'}]}>
                        Apply
                      </Text>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>

      {/* Date Picker Modal */}
      <Modal visible={isDatePickerVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {padding: 30, justifyContent: 'center'},
            ]}>
            <DateTimePicker
              mode="single"
              date={tempDate}
              onChange={({date}) => setTempDate(date)}
              styles={defaultStyles}
            />
            <View style={styles.dateActionRow}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  if (activeDateField === 'from') setFromDate(tempDate);
                  if (activeDateField === 'to') setToDate(tempDate);
                  setIsDatePickerVisible(false);
                  setActiveDateField(null);
                }}>
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsDatePickerVisible(false)}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default FilterTicketModel;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  keyboardAvoiding: {
    // flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    height: '80%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dateActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
