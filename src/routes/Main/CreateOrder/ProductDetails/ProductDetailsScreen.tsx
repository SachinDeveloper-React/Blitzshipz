import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  CustomButton,
  CustomIcons,
  CustomText,
  CustomTextInput,
} from '../../../../components';

import {
  useCreateOrderService,
  useProfileMyProductService,
} from '../../../../services';
import DropDownPicker from 'react-native-dropdown-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {navigate, RootStackParamList} from '../../../../navigation';

type Props = {};

const ProductDetailsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProductDetailsScreen'>) => {
  const {
    state,
    errors,
    headerHeight,
    setOrderField,
    handleToDroping,
    handleToCreateBooking,
  } = useCreateOrderService();
  const {myProduct, fetchData} = useProfileMyProductService();

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(state.productName);

  const quantityRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const taxesRef = useRef<TextInput>(null);
  const weightRef = useRef<TextInput>(null);
  const lRef = useRef<TextInput>(null);
  const bRef = useRef<TextInput>(null);
  const hRef = useRef<TextInput>(null);

  useEffect(() => {
    const l = parseFloat(state.l) || 0;
    const b = parseFloat(state.b) || 0;
    const h = parseFloat(state.h) || 0;
    const volWeight = (l * b * h) / 5000;
    setOrderField('volumentricWeight', volWeight.toString());
  }, [state.b, state.l, state.h]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigate('ProductFormScreen', {
                type: 'add',
              })
            }>
            <CustomIcons type="AntDesign" size={22} color="#000" name="plus" />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={headerHeight}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.formSection}>
              <Text style={styles.heading}>Product Details</Text>
              <View>
                <Text style={styles.label}>Select Product</Text>
                <DropDownPicker
                  listMode="FLATLIST"
                  open={open1}
                  value={value1}
                  setValue={setValue1}
                  setOpen={setOpen1}
                  items={myProduct.map(item => ({
                    label: item.productName,
                    value: item.id,
                    categoryName: item.categoryName,
                    productPrice: item.productPrice,
                    tax: item.tax,
                    volume: item.volume,
                    l: item.l,
                    h: item.h,
                    b: item.b,
                    totalPrice: item.totalPrice,
                    actualWeight: item.weight,
                  }))}
                  onSelectItem={(e: any) => {
                    setOrderField('productName', e.label?.toString() ?? '');
                    setOrderField(
                      'productCategory',
                      e.categoryName?.toString() ?? '',
                    );
                    setOrderField(
                      'productPrice',
                      e.productPrice?.toString() ?? '',
                    );
                    setOrderField('totalTaxes', e.tax?.toString() ?? '');
                    setOrderField('l', e.l?.toString() ?? '');
                    setOrderField('b', e.b?.toString() ?? '');
                    setOrderField('h', e.h?.toString() ?? '');
                    setOrderField(
                      'totalAmount',
                      e.totalPrice?.toString() ?? '',
                    );
                    setOrderField(
                      'actualWeight',
                      e.actualWeight?.toString() ?? '',
                    );
                  }}
                  setItems={() => {}}
                  placeholder="Select Product"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
                {errors.productName && (
                  <CustomText
                    variant="caption"
                    style={{color: 'red', marginTop: 5}}>
                    {errors.productName}
                  </CustomText>
                )}
              </View>
              <CustomTextInput
                label="Category"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                placeholderTextColor="#ccc"
                onChangeText={text => setOrderField('productCategory', text)}
                value={state.productCategory}
                defaultValue={state.productCategory}
                errorMessage={errors.productCategory}
                disabled
                editable={false}
                leftIcon={
                  <CustomIcons
                    type="MaterialIcons"
                    name="category"
                    size={20}
                    color="gray"
                  />
                }
              />

              <CustomTextInput
                ref={quantityRef}
                label="Quantity"
                inputMode="numeric"
                keyboardType="number-pad"
                onChangeText={text => setOrderField('productQuantity', text)}
                value={state.productQuantity.toString()}
                defaultValue={state.productQuantity.toString()}
                errorMessage={errors.productQuantity}
                placeholderTextColor="#ccc"
                leftIcon={
                  <CustomIcons
                    type="MaterialIcons"
                    name="numbers"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="next"
                onSubmitEditing={() => priceRef.current?.focus()}
              />

              <CustomTextInput
                ref={priceRef}
                label="Price"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text => setOrderField('productPrice', text)}
                value={state.productPrice}
                defaultValue={state.productPrice}
                errorMessage={errors.productPrice}
                placeholderTextColor="#ccc"
                leftIcon={
                  <CustomIcons
                    type="MaterialIcons"
                    name="currency-rupee"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="next"
                onSubmitEditing={() => taxesRef.current?.focus()}
              />

              <CustomTextInput
                ref={taxesRef}
                label="Taxes"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => setOrderField('totalTaxes', text)}
                value={state.totalTaxes}
                defaultValue={state.totalTaxes}
                errorMessage={errors.totalTaxes}
                placeholderTextColor="#ccc"
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="address"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="next"
                onSubmitEditing={() => weightRef.current?.focus()}
              />

              <View style={styles.checkboxRow}>
                <View style={styles.checkboxOption}>
                  <TouchableOpacity
                    onPress={() => setOrderField('fragile', !state.fragile)}
                    style={[
                      styles.checkbox,
                      state.fragile && styles.checkboxSelected,
                    ]}>
                    <CustomIcons
                      name="checkmark"
                      type="Ionicons"
                      size={15}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <CustomText>Fragile Product</CustomText>
                </View>
              </View>

              <Text style={styles.heading}>Payment Mode:</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxRow}>
                  <View style={styles.checkboxOption}>
                    <TouchableOpacity
                      onPress={() => setOrderField('paymentMode', 'COD')}
                      style={[
                        styles.checkbox,
                        state.paymentMode === 'COD' && styles.checkboxSelected,
                      ]}>
                      <CustomIcons
                        name="checkmark"
                        type="Ionicons"
                        size={15}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <CustomText>COD</CustomText>
                  </View>
                  <View style={styles.checkboxOption}>
                    <TouchableOpacity
                      onPress={() => setOrderField('paymentMode', 'Prepaid')}
                      style={[
                        styles.checkbox,
                        state.paymentMode === 'Prepaid' &&
                          styles.checkboxSelected,
                      ]}>
                      <CustomIcons
                        name="checkmark"
                        type="Ionicons"
                        size={15}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <CustomText>Prepaid</CustomText>
                  </View>
                </View>
                {errors.paymentMode && (
                  <CustomText
                    variant="caption"
                    style={{color: 'red', marginTop: 5}}>
                    Payment Mode Required
                  </CustomText>
                )}
              </View>
              <Text style={styles.heading}>
                Total Amount: {state.totalAmount}
              </Text>

              <CustomTextInput
                ref={weightRef}
                label="Dead/Actual weight (kg)"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text => setOrderField('actualWeight', text)}
                value={state.actualWeight}
                defaultValue={state.actualWeight}
                errorMessage={errors.actualWeight}
                placeholderTextColor="#ccc"
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="address"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="next"
                onSubmitEditing={() => lRef.current?.focus()}
              />

              <Text style={styles.subHeading}>Dimensions (cm)</Text>
              <View>
                <View style={styles.dimensionRow}>
                  <TextInput
                    ref={lRef}
                    inputMode="numeric"
                    style={styles.inputDim}
                    placeholder="L"
                    keyboardType="numeric"
                    value={state.l}
                    onChangeText={text => setOrderField('l', text)}
                    placeholderTextColor="#ccc"
                    returnKeyType="next"
                    onSubmitEditing={() => bRef.current?.focus()}
                  />
                  <Text style={styles.multiply}>×</Text>
                  <TextInput
                    ref={bRef}
                    inputMode="numeric"
                    style={styles.inputDim}
                    placeholder="B"
                    keyboardType="numeric"
                    value={state.b}
                    onChangeText={text => setOrderField('b', text)}
                    placeholderTextColor="#ccc"
                    returnKeyType="next"
                    onSubmitEditing={() => hRef.current?.focus()}
                  />
                  <Text style={styles.multiply}>×</Text>
                  <TextInput
                    ref={hRef}
                    inputMode="numeric"
                    style={styles.inputDim}
                    placeholder="H"
                    keyboardType="numeric"
                    value={state.h}
                    onChangeText={text => setOrderField('h', text)}
                    placeholderTextColor="#ccc"
                    returnKeyType="done"
                  />
                </View>
                {errors.l && (
                  <CustomText
                    variant="caption"
                    style={{color: 'red', marginTop: 5}}>
                    {errors.l}
                  </CustomText>
                )}
                {errors.b && (
                  <CustomText
                    variant="caption"
                    style={{color: 'red', marginTop: 5}}>
                    {errors.b}
                  </CustomText>
                )}
                {errors.h && (
                  <CustomText
                    variant="caption"
                    style={{color: 'red', marginTop: 5}}>
                    {errors.h}
                  </CustomText>
                )}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Volumetric Weight (kg)</Text>
                <Text style={styles.total}>{state.volumentricWeight}</Text>
              </View>

              <CustomButton title="Create" onPress={handleToCreateBooking} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formSection: {
    flexDirection: 'column',
    gap: 20,
  },
  heading: {
    fontSize: 24,

    fontWeight: '600',
    color: '#0a2f50',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  dimensionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  inputDim: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  multiply: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  checkboxGroup: {
    flexDirection: 'column',
    gap: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    gap: 10,
  },
  checkboxOption: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: 'blue',
    borderWidth: 0,
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
});
