import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {
  AddDocumentCard,
  CustomButton,
  CustomIcons,
  CustomText,
  CustomTextInput,
  ShownDocument,
} from '../../../../components';
import {useProfileBankDetailService} from '../../../../services';
import {Picker} from '@react-native-picker/picker';
import {banksList, typeList} from './helper';

const BankingDetailsScreen = () => {
  const {
    bankDetailData,
    loading,
    onRefresh,
    handleSelectImage,
    imageUri,
    setSingleValue,
    handleBankDetails,
  } = useProfileBankDetailService();

  if (loading.bankDetail) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.inner}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading.refreshBankDetail}
                onRefresh={onRefresh}
              />
            }>
            <CustomText variant="title" style={styles.title}>
              Banking Details
            </CustomText>

            <View style={styles.formContainer}>
              <CustomTextInput
                label="Beneficiary Name"
                defaultValue={bankDetailData?.beneficiaryName}
                onChangeText={text => setSingleValue('beneficiaryName', text)}
                autoCapitalize="none"
                placeholderTextColor="#ccc"
                placeholder="Beneficiary Name"
                leftIcon={
                  <CustomIcons
                    type="AntDesign"
                    name="user"
                    size={20}
                    color="#000"
                  />
                }
              />

              <CustomTextInput
                label="Account Number"
                defaultValue={bankDetailData?.accountNumber}
                onChangeText={text => setSingleValue('accountNumber', text)}
                keyboardAppearance="light"
                keyboardType="number-pad"
                inputMode="numeric"
                placeholderTextColor="#ccc"
                placeholder="Account Number"
                maxLength={14}
                leftIcon={
                  <CustomIcons
                    name="account-balance"
                    color="#000"
                    size={20}
                    type="MaterialIcons"
                  />
                }
              />
              {/* <CustomTextInput
                label="Re-enter Account Number"
                defaultValue={bankDetailData?.accountNumber}
                onChangeText={text => setSingleValue('accountNumber', text)}
                keyboardAppearance="light"
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={14}
                leftIcon={
                  <CustomIcons
                    name="account-balance"
                    color="#000"
                    size={20}
                    type="MaterialIcons"
                  />
                }
              /> */}
              <CustomTextInput
                label="IFSC"
                defaultValue={bankDetailData?.ifscCode}
                onChangeText={text => setSingleValue('ifscCode', text)}
                autoCapitalize="none"
                placeholderTextColor="#ccc"
                placeholder="IFSC"
                leftIcon={
                  <CustomIcons
                    name="building"
                    color="#000"
                    size={20}
                    type="FontAwesome"
                  />
                }
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={bankDetailData?.accountType}
                  onValueChange={(itemValue, itemIndex) => {
                    setSingleValue('accountType', itemValue);
                  }}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dropdown">
                  {typeList.map((item, i) => (
                    <Picker.Item key={i} label={item} value={item} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={bankDetailData?.bankName}
                  onValueChange={(itemValue, itemIndex) => {
                    setSingleValue('bankName', itemValue);
                  }}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dropdown">
                  {banksList.map((item, i) => (
                    <Picker.Item key={i} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>

              {(bankDetailData?.image?.length ?? 0) === 0 && !imageUri ? (
                <AddDocumentCard onPress={handleSelectImage} />
              ) : (
                <ShownDocument
                  onPress={handleSelectImage}
                  uri={
                    imageUri ||
                    `data:image/png;base64,${bankDetailData?.image?.[0]?.data?.data}`
                  }
                />
              )}

              <CustomButton
                disabled={bankDetailData?.verify}
                title="Save Details"
                onPress={handleBankDetails}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BankingDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    padding: 14,
  },
  title: {
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555',
    marginRight: 12,
  },
  text: {
    fontSize: 16,
  },
  pickerContainer: {
    overflow: 'hidden',
    height: Platform.OS === 'android' ? 60 : 120,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'relative',
  },
  picker: {
    fontSize: 14,
    color: '#000',
  },
  pickerItem: {
    fontSize: 14,
    color: '#000',
  },
});
