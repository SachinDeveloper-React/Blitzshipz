import React, {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/elements';
import {RootStackParamList} from '../../../navigation';
import {
  CustomButton,
  CustomIcons,
  CustomText,
  CustomTextInput,
} from '../../../components';
import {useWarehouseService} from '../../../services';

type WarehouseScreenProps = StackScreenProps<
  RootStackParamList,
  'WarehouseScreen'
>;

const WarehouseScreen = ({navigation, route}: WarehouseScreenProps) => {
  const {type, defaultData} = route.params;
  const headerHeight = useHeaderHeight();
  const {
    addWarehouse,
    updateWarehouseField,
    validateWarehouseInfo,
    createWareHouse,
    errors,
    loading,
  } = useWarehouseService({
    type,
    defaultData,
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: type === 'add' ? 'Add Warehouse' : 'Edit Warehouse',
    });
  }, [navigation, type]);

  const renderCheckboxGroup = (
    label: string,
    value: boolean,
    onChange: (val: boolean) => void,
  ) => (
    <View style={styles.checkboxGroup}>
      <CustomText variant="subtitle">{label}</CustomText>
      <View style={styles.checkboxRow}>
        {['Yes', 'No'].map(option => {
          const isSelected = option === 'Yes' ? value : !value;
          return (
            <View style={styles.checkboxOption} key={option}>
              <TouchableOpacity
                onPress={() => onChange(option === 'Yes')}
                style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected,
                ]}>
                <CustomIcons
                  name="checkmark"
                  type="Ionicons"
                  size={15}
                  color="#fff"
                />
              </TouchableOpacity>
              <CustomText>{option}</CustomText>
            </View>
          );
        })}
      </View>
    </View>
  );

  const handleSubmit = () => {
    if (validateWarehouseInfo()) {
      createWareHouse();
    } else {
      console.log('Error');
    }
  };

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
              <CustomTextInput
                label="Name"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                placeholderTextColor="#ccc"
                onChangeText={text => updateWarehouseField('name', text)}
                value={addWarehouse.name}
                defaultValue={addWarehouse.name}
                errorMessage={errors.name}
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
                label="Email"
                inputMode="email"
                keyboardType="email-address"
                placeholder="Type here"
                onChangeText={text => updateWarehouseField('email', text)}
                value={addWarehouse.email}
                placeholderTextColor="#ccc"
                defaultValue={addWarehouse.email}
                errorMessage={errors.email}
                leftIcon={
                  <CustomIcons
                    type="MaterialCommunityIcons"
                    name="email"
                    size={20}
                    color="gray"
                  />
                }
              />
              <CustomTextInput
                label="Address"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => updateWarehouseField('address', text)}
                value={addWarehouse.address}
                defaultValue={addWarehouse.address}
                placeholderTextColor="#ccc"
                errorMessage={errors.address}
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="address"
                    size={20}
                    color="gray"
                  />
                }
              />
              <CustomTextInput
                label="Pin Code"
                inputMode="numeric"
                keyboardType="number-pad"
                maxLength={6}
                placeholder="Type here"
                onChangeText={text => updateWarehouseField('pin', text)}
                value={addWarehouse.pin}
                defaultValue={addWarehouse.pin}
                placeholderTextColor="#ccc"
                errorMessage={errors.pin}
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="location-pin"
                    size={20}
                    color="gray"
                  />
                }
              />
              <CustomTextInput
                label="Mobile"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text => updateWarehouseField('phone', text)}
                defaultValue={addWarehouse.phone}
                value={addWarehouse.phone}
                errorMessage={errors.phone}
                placeholderTextColor="#ccc"
              />
              <CustomTextInput
                label="Alt Mobile"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text => updateWarehouseField('altPhone', text)}
                defaultValue={addWarehouse.altPhone}
                value={addWarehouse.altPhone}
                errorMessage={errors.altPhone}
                placeholderTextColor="#ccc"
              />
              <CustomTextInput
                label="City"
                readOnly
                placeholder="City..."
                value={addWarehouse.city}
                defaultValue={addWarehouse.city}
                errorMessage={errors.city}
                leftIcon={
                  <CustomIcons
                    type="MaterialCommunityIcons"
                    name="city-variant-outline"
                    size={20}
                    color="gray"
                  />
                }
                placeholderTextColor="#ccc"
              />
              <CustomTextInput
                label="State"
                readOnly
                placeholder="State..."
                value={addWarehouse.state}
                defaultValue={addWarehouse.state}
                errorMessage={errors.state}
                placeholderTextColor="#ccc"
                leftIcon={
                  <CustomIcons
                    type="MaterialCommunityIcons"
                    name="city-variant-outline"
                    size={20}
                    color="gray"
                  />
                }
              />

              {renderCheckboxGroup(
                'Is this your primary warehouse?',
                addWarehouse.primary,
                val => updateWarehouseField('primary', val),
              )}
              {renderCheckboxGroup(
                'Is return address same as pickup address?',
                addWarehouse.returnSame,
                val => updateWarehouseField('returnSame', val),
              )}

              {!addWarehouse.returnSame && (
                <View>
                  <CustomText variant="title" style={styles.sectionTitle}>
                    Return Point
                  </CustomText>
                  <View style={styles.formSection}>
                    <CustomTextInput
                      label="Address"
                      inputMode="text"
                      keyboardType="default"
                      placeholder="Type here"
                      onChangeText={text =>
                        updateWarehouseField('returnAddress', text)
                      }
                      value={addWarehouse.returnAddress}
                      defaultValue={addWarehouse.returnAddress}
                      errorMessage={errors.returnAddress}
                      leftIcon={
                        <CustomIcons
                          type="Feather"
                          name="user"
                          size={20}
                          color="gray"
                        />
                      }
                      placeholderTextColor="#ccc"
                    />
                    <CustomTextInput
                      label="Return Pin"
                      inputMode="text"
                      keyboardType="default"
                      placeholder="Type here"
                      onChangeText={text =>
                        updateWarehouseField('returnPin', text)
                      }
                      value={addWarehouse.returnPin}
                      defaultValue={addWarehouse.returnPin}
                      errorMessage={errors.returnPin}
                      leftIcon={
                        <CustomIcons
                          type="Entypo"
                          name="location-pin"
                          size={20}
                          color="gray"
                        />
                      }
                      placeholderTextColor="#ccc"
                    />
                    <CustomTextInput
                      label="City"
                      readOnly
                      placeholder="City..."
                      leftIcon={
                        <CustomIcons
                          type="MaterialCommunityIcons"
                          name="city-variant-outline"
                          size={20}
                          color="gray"
                        />
                      }
                      placeholderTextColor="#ccc"
                      value={addWarehouse.returnCity}
                      defaultValue={addWarehouse.returnCity}
                      errorMessage={errors.returnCity}
                    />
                    <CustomTextInput
                      label="State"
                      readOnly
                      placeholder="State..."
                      leftIcon={
                        <CustomIcons
                          type="MaterialCommunityIcons"
                          name="city-variant-outline"
                          size={20}
                          color="gray"
                        />
                      }
                      placeholderTextColor="#ccc"
                      value={addWarehouse.returnState}
                      defaultValue={addWarehouse.returnState}
                      errorMessage={errors.returnState}
                    />
                  </View>
                </View>
              )}

              <CustomButton
                loading={loading}
                title="Save"
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WarehouseScreen;

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
  sectionTitle: {
    marginBottom: 20,
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
});
