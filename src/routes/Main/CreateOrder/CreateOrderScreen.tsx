import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  LogBox,
  RefreshControl,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {CustomButton, CustomIcons} from '../../../components';
import {BottomTabParamList, navigate} from '../../../navigation';
import {useCreateOrderService} from '../../../services';

const CreateOrderScreen = ({
  navigation,
}: NativeStackScreenProps<BottomTabParamList, 'CreateOrderScreen'>) => {
  const {
    errors,
    state,
    sellers,
    warehouses,
    headerHeight,
    setOrderField,
    handleToPickup,
    fetchAllData,
    resetOrder,
  } = useCreateOrderService();

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(state.pickupAddress);

  const [refreshLoading, setRefreshLoading] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(state.sellerName);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}
            onPress={() =>
              navigate('WarehouseScreen', {
                type: 'add',
              })
            }>
            <CustomIcons type="AntDesign" size={22} color="#000" name="plus" />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const onRefresh = async () => {
    setRefreshLoading(true);
    fetchAllData();
    setRefreshLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    resetOrder();
  }, []);

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // 👈 Not recommended unless absolutely necessary
  ]);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          refreshControl={
            <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
          }
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={headerHeight}
          enableOnAndroid={true}>
          <Text style={styles.heading}>Pickup Details</Text>
          <View>
            <Text style={styles.label}>Pickup Address</Text>
            <DropDownPicker
              listMode="FLATLIST"
              open={open1}
              value={value1}
              setValue={setValue1}
              items={warehouses.map(item => ({
                label: item.name,
                value: item.id,
                warehouseName: item.name,
                pickupAddress: item.address,
                pickupPincode: item.pin,
                pickupMobile: item.phone,
                pickupAlternative_mobile: item.altPhone,
                pickupCity: item.city,
                pickupState: item.state,
                pickupEmail: item.email,
                returnName: item.returnName,
                returnEmail: item.returnEmail,
                returnMobile: item.returnPhone,
                returnAltPhone: item.returnAltPhone,
                returnAddress: item.returnAddress,
                returnCity: item.returnCity,
                returnState: item.returnState,
                returnPin: item.returnPin,
              }))}
              setOpen={setOpen1}
              onSelectItem={(e: any) => {
                setOrderField(
                  'warehouseName',
                  e.warehouseName?.toString() ?? '',
                );
                setOrderField(
                  'pickupAddress',
                  e.pickupAddress?.toString() ?? '',
                );
                setOrderField(
                  'pickupPincode',
                  e.pickupPincode?.toString() ?? '',
                );
                setOrderField('pickupMobile', e.pickupMobile?.toString() ?? '');
                setOrderField(
                  'pickupAlternative_mobile',
                  e.pickupAlternative_mobile?.toString() ?? '',
                );
                setOrderField('pickupCity', e.pickupState?.toString() ?? '');
                setOrderField('pickupState', e.pickupState?.toString() ?? '');
                setOrderField('pickupEmail', e.pickupEmail?.toString() ?? '');
                setOrderField('returnName', e.returnName?.toString() ?? '');
                setOrderField('returnEmail', e.returnEmail?.toString() ?? '');
                setOrderField('returnMobile', e.returnMobile?.toString() ?? '');
                setOrderField(
                  'returnAlternative_mobile',
                  e.returnAltPhone?.toString() ?? '',
                );
                setOrderField(
                  'returnAddress',
                  e.returnAddress?.toString() ?? '',
                );
                setOrderField('returnCity', e.returnCity?.toString() ?? '');
                setOrderField('returnState', e.returnState?.toString() ?? '');
                setOrderField('returnPincode', e.returnPin?.toString() ?? '');
              }}
              setItems={() => {}}
              placeholder="Select address"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
            {errors.pickupAddress && (
              <Text style={styles.error}>{errors.pickupAddress}</Text>
            )}
          </View>

          <View style={{zIndex: 2000, marginTop: 30}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.label}>Seller</Text>
              <TouchableOpacity
                style={{
                  marginBottom: 8,
                }}
                onPress={() => {
                  navigate('SellerScreen');
                }}>
                <CustomIcons
                  type="AntDesign"
                  size={16}
                  color="#000"
                  name="plus"
                />
              </TouchableOpacity>
            </View>
            <DropDownPicker
              listMode="FLATLIST"
              open={open2}
              value={value2}
              items={sellers.map(item => ({
                label: item.name,
                value: item.id,
                sellerName: item.name,
                sellerAddress: item.address,
              }))}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={() => {}}
              onSelectItem={(e: any) => {
                setOrderField('sellerName', e.sellerName?.toString() ?? '');
                setOrderField('sellerAddress', e.sellerAddress?.toString());
              }}
              placeholder="Select seller"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
            {errors.sellerName && (
              <Text style={styles.error}>{errors.sellerName}</Text>
            )}
          </View>

          <View style={{marginTop: 30}}>
            <Text style={styles.label}>Seller Address</Text>
            <TextInput
              placeholder="Enter seller address"
              keyboardType="default"
              inputMode="text"
              keyboardAppearance="default"
              style={styles.input}
              placeholderTextColor="#ccc"
              value={state.sellerAddress}
              onChangeText={text => {
                setOrderField('sellerAddress', text);
              }}
            />
            {errors.sellerAddress && (
              <Text style={styles.error}>{errors.sellerAddress}</Text>
            )}
          </View>

          <View style={{marginTop: 40}}>
            <CustomButton title="Next" onPress={handleToPickup} />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreateOrderScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '600',
    color: '#0a2f50',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,

    fontWeight: '600',
    color: 'darkslategray',
  },
  dropdown: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 50,
  },
  dropdownContainer: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 8,
  },

  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'green',
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#000',
  },
});
