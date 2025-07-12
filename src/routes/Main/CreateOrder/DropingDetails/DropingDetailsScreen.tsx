import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useRef} from 'react';

import {
  CustomButton,
  CustomIcons,
  CustomTextInput,
} from '../../../../components';

import {useCreateOrderService} from '../../../../services';

type Props = {};

const DropingDetailsScreen = (props: Props) => {
  const {state, errors, headerHeight, setOrderField, handleToDroping} =
    useCreateOrderService();

  const dropEmailRef = useRef<TextInput>(null);
  const dropMobileRef = useRef<TextInput>(null);
  const dropAltMobileRef = useRef<TextInput>(null);
  const dropAddressRef = useRef<TextInput>(null);
  const dropPincodeRef = useRef<TextInput>(null);
  const dropLandmarkRef = useRef<TextInput>(null);
  const referenceNumberRef = useRef<TextInput>(null);
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
              <Text style={styles.heading}>Drop Details</Text>
              <CustomTextInput
                label="Full Name"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                placeholderTextColor="#ccc"
                onChangeText={text => setOrderField('dropName', text)}
                value={state.dropName}
                defaultValue={state.dropName}
                errorMessage={errors.dropName}
                leftIcon={
                  <CustomIcons
                    type="Feather"
                    name="user"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="next"
                onSubmitEditing={() => dropEmailRef.current?.focus()}
              />
              <CustomTextInput
                ref={dropEmailRef}
                label="Email"
                inputMode="email"
                keyboardType="email-address"
                placeholder="Type here"
                placeholderTextColor="#ccc"
                onChangeText={text => setOrderField('dropEmail', text)}
                value={state.dropEmail}
                defaultValue={state.dropEmail}
                errorMessage={errors.dropEmail}
                leftIcon={
                  <CustomIcons
                    type="Feather"
                    name="user"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="next"
                onSubmitEditing={() => dropMobileRef.current?.focus()}
              />

              <CustomTextInput
                ref={dropMobileRef}
                label="Mobile"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text => setOrderField('dropMobile', text)}
                value={state.dropMobile}
                defaultValue={state.dropMobile}
                errorMessage={errors.dropMobile}
                placeholderTextColor="#ccc"
                returnKeyType="next"
                onSubmitEditing={() => dropAltMobileRef.current?.focus()}
              />

              <CustomTextInput
                ref={dropAltMobileRef}
                label="Alt Mobile"
                inputMode="numeric"
                keyboardType="number-pad"
                placeholder="Type here"
                onChangeText={text =>
                  setOrderField('dropAlternative_mobile', text)
                }
                value={state.dropAlternative_mobile}
                defaultValue={state.dropAlternative_mobile}
                errorMessage={errors.dropAlternative_mobile}
                placeholderTextColor="#ccc"
                returnKeyType="next"
                onSubmitEditing={() => dropAddressRef.current?.focus()}
              />

              <CustomTextInput
                ref={dropAddressRef}
                label="Address"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => setOrderField('dropAddress', text)}
                value={state.dropAddress}
                defaultValue={state.dropAddress}
                errorMessage={errors.dropAddress}
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
                onSubmitEditing={() => dropPincodeRef.current?.focus()}
              />

              <CustomTextInput
                ref={dropPincodeRef}
                label="Pin Code"
                inputMode="numeric"
                keyboardType="number-pad"
                maxLength={6}
                placeholder="Type here"
                onChangeText={text => setOrderField('dropPincode', text)}
                value={state.dropPincode}
                defaultValue={state.dropPincode}
                errorMessage={errors.dropPincode}
                placeholderTextColor="#ccc"
                returnKeyLabel="next"
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="location-pin"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="next"
                onSubmitEditing={() => dropLandmarkRef.current?.focus()}
              />

              <CustomTextInput
                label="City"
                readOnly
                placeholder="City..."
                value={state.dropCity}
                defaultValue={state.dropCity}
                errorMessage={errors.dropCity}
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
                value={state.dropState}
                defaultValue={state.dropState}
                errorMessage={errors.dropState}
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

              <CustomTextInput
                ref={dropLandmarkRef}
                label="Landmark"
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => setOrderField('dropLandmark', text)}
                value={state.dropLandmark}
                defaultValue={state.dropLandmark}
                errorMessage={errors.dropLandmark}
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
                onSubmitEditing={() => referenceNumberRef.current?.focus()}
              />
              <CustomTextInput
                ref={referenceNumberRef}
                label="Reference No."
                inputMode="text"
                keyboardType="default"
                placeholder="Type here"
                onChangeText={text => setOrderField('referenceNumber', text)}
                value={state.referenceNumber}
                defaultValue={state.referenceNumber}
                errorMessage={errors.referenceNumber}
                placeholderTextColor="#ccc"
                leftIcon={
                  <CustomIcons
                    type="Entypo"
                    name="address"
                    size={20}
                    color="gray"
                  />
                }
                returnKeyType="send"
                onSubmitEditing={handleToDroping}
              />

              <CustomButton title="Next" onPress={handleToDroping} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DropingDetailsScreen;

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
});
