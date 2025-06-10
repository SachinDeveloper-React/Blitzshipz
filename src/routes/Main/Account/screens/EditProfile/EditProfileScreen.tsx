import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../navigation';
import {
  CustomButton,
  CustomIcons,
  CustomTextInput,
} from '../../../../../components';
import {useHeaderHeight} from '@react-navigation/elements';
import {useUpdateProfileService} from '../../../../../services';

const EditProfileScreen = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'EditProfileScreen'>) => {
  const {userData} = route.params;
  if (!userData) return;
  const {
    editUser,
    updateUserField,
    errors,
    validateUserInfo,
    editProfile,
    loading,
  } = useUpdateProfileService({
    initialData: userData,
  });
  const headerHeight = useHeaderHeight();

  const handleSubmit = () => {
    if (validateUserInfo()) {
      editProfile();
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
                label="Full Name"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => updateUserField('firstName', text)}
                value={editUser.firstName}
                defaultValue={`${userData?.firstName} ${userData?.lastName}`}
                errorMessage={errors.firstName}
                editable={editUser.verified ? false : true}
                disabled={editUser.verified ? true : false}
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
                label="Company Name"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => updateUserField('companyName', text)}
                value={editUser.companyName}
                defaultValue={userData?.companyName}
                errorMessage={errors.companyName}
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
                label="Mobile"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text => updateUserField('mobileNumber', text)}
                value={editUser.mobileNumber}
                defaultValue={userData?.mobileNumber}
                errorMessage={errors.mobileNumber}
              />
              <CustomTextInput
                label="Alt Mobile"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text => updateUserField('altMobileNumber', text)}
                value={editUser.altMobileNumber}
                defaultValue={userData?.altMobileNumber}
                errorMessage={errors.altMobileNumber}
              />
              <CustomTextInput
                label="Email*"
                inputMode="email"
                keyboardType="email-address"
                placeholder="Type here"
                onChangeText={text => updateUserField('email', text)}
                value={editUser.email}
                defaultValue={userData?.email}
                errorMessage={errors.email}
                readOnly={userData?.emailVerified ? true : false}
                editable={editUser.emailVerified ? false : true}
                disabled={editUser.emailVerified ? true : false}
                leftIcon={
                  <CustomIcons
                    type="MaterialCommunityIcons"
                    name="email"
                    size={20}
                    color="gray"
                  />
                }
                rightIcon={
                  <CustomIcons
                    type="MaterialIcons"
                    name="check-circle"
                    size={20}
                    color={userData?.emailVerified ? 'green' : 'gray'}
                  />
                }
              />
              <CustomTextInput
                label="Website"
                inputMode="url"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => updateUserField('websiteUrl', text)}
                value={editUser.websiteUrl}
                defaultValue={userData?.websiteUrl}
                errorMessage={errors.websiteUrl}
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="address"
                    size={20}
                    color="gray"
                  />
                }
              />

              <CustomButton
                loading={loading}
                title="Save"
                onPress={() => handleSubmit()}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

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
