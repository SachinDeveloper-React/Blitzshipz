import {
  Modal,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {
  CustomButton,
  CustomIcons,
  CustomTextInput,
} from '../../../../../components';

type Props = {
  filtermodalVisible: boolean;
  setFilterModalVisible: Dispatch<SetStateAction<boolean>>;
  onApply: () => void;
  onClose: () => void;
  filterForm: {
    dropName: string;
    orderId: string;
    orderLive: boolean;
    phoneNumber: string;
    referenceNumber: string;
    status: string | null;
  };
  setFilterForm: Dispatch<
    SetStateAction<{
      dropName: string;
      orderId: string;
      orderLive: boolean;
      phoneNumber: string;
      referenceNumber: string;
      status: string | null;
    }>
  >;
};

const FilterSection = ({
  filterForm,
  setFilterForm,
  onApply,
  filtermodalVisible,
  onClose,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filtermodalVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        {/* Touchable backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <KeyboardAvoidingView
          style={{flex: 1, justifyContent: 'flex-end'}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalView}>
            <ScrollView
              contentContainerStyle={{padding: 16, gap: 20}}
              showsVerticalScrollIndicator={false}>
              <CustomTextInput
                label="Order Id"
                inputMode="text"
                keyboardType="default"
                value={filterForm.orderId}
                placeholder="Order Id"
                placeholderTextColor={'#ccc'}
                onChangeText={text =>
                  setFilterForm(prev => ({...prev, orderId: text}))
                }
                leftIcon={
                  <CustomIcons
                    type="MaterialIcons"
                    name="local-shipping"
                    size={20}
                    color="gray"
                  />
                }
              />
              <CustomTextInput
                label="Reference No."
                inputMode="numeric"
                keyboardType="numeric"
                value={filterForm.referenceNumber}
                placeholder="Ref. No"
                placeholderTextColor={'#ccc'}
                onChangeText={text =>
                  setFilterForm(prev => ({...prev, referenceNumber: text}))
                }
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="book"
                    size={20}
                    color="gray"
                  />
                }
              />
              <CustomTextInput
                label="Drop Name"
                keyboardType="default"
                inputMode="text"
                placeholderTextColor={'#ccc'}
                placeholder="Drop Name"
                value={filterForm.dropName}
                onChangeText={text =>
                  setFilterForm(prev => ({...prev, dropName: text}))
                }
                leftIcon={
                  <CustomIcons
                    type="Feather"
                    name="user"
                    size={20}
                    color="gray"
                  />
                }
              />
              <CustomTextInput
                label="Drop Phone"
                inputMode="tel"
                keyboardType="numeric"
                placeholderTextColor={'#ccc'}
                maxLength={10}
                value={filterForm.phoneNumber}
                placeholder="Drop Phone Number"
                onChangeText={text =>
                  setFilterForm(prev => ({...prev, phoneNumber: text}))
                }
              />

              {/* Buttons */}
              <View style={styles.actionsRow}>
                <View style={{flex: 1}}>
                  <CustomButton
                    title="Clear"
                    onPress={() =>
                      setFilterForm(prev => ({
                        ...prev,
                        dropName: '',
                        orderId: '',
                        referenceNumber: '',
                        phoneNumber: '',
                      }))
                    }
                  />
                </View>
                <View style={{flex: 1}}>
                  <CustomButton title="Apply" onPress={onApply} />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default FilterSection;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    paddingVertical: 35,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
});
