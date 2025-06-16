import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native';
import {
  CustomButton,
  CustomIcons,
  CustomPicker,
  CustomTextInput,
} from '../../../../components';
import {useHeaderHeight} from '@react-navigation/elements';
import {useRateService} from '../../../../services';
import RateCardList from './RateCardList';

const RateCalculatorForm = () => {
  const headerHeight = useHeaderHeight();
  const {calculaterData, onSubmit, handleChange, errors, form, loading} =
    useRateService();
  const [keyboardShown, setKeyboardShown] = useState(false);

  const originRef = useRef<TextInput>(null);
  const destinationRef = useRef<TextInput>(null);
  const weightRef = useRef<TextInput>(null);
  const declaredAmountRef = useRef<TextInput>(null);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardShown(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardShown(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'android'
          ? keyboardShown
            ? headerHeight + 50
            : 0
          : headerHeight + 50
      }
      style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* All your form inputs here */}
          <CustomPicker
            label="Grade"
            selectedValue={form.grade}
            onValueChange={value => handleChange('grade', value)}
            items={[
              {label: 'SILVER', value: 'SILVER'},
              {label: 'GOLD', value: 'GOLD'},
              {label: 'DIAMOND', value: 'DIAMOND'},
              {label: 'PLATINUM', value: 'PLATINUM'},
            ]}
            leftIcon={
              <CustomIcons
                name="grade"
                type="MaterialIcons"
                size={24}
                color=""
              />
            }
          />

          <CustomTextInput
            ref={originRef}
            label="Origin Pincode"
            keyboardType="number-pad"
            maxLength={6}
            value={form.origin}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => destinationRef.current?.focus()}
            onChangeText={text => handleChange('origin', text)}
            error={!!errors.origin}
            errorMessage={errors.origin}
            placeholderTextColor="#ccc"
            placeholder="Origin Pin"
            leftIcon={
              <CustomIcons
                name="location-pin"
                type="MaterialIcons"
                size={24}
                color=""
              />
            }
          />

          <CustomTextInput
            ref={destinationRef}
            label="Destination Pincode"
            keyboardType="number-pad"
            maxLength={6}
            value={form.destination}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => weightRef.current?.focus()}
            onChangeText={text => handleChange('destination', text)}
            error={!!errors.destination}
            errorMessage={errors.destination}
            placeholderTextColor="#ccc"
            placeholder="Destination Pin"
            leftIcon={
              <CustomIcons
                name="location-pin"
                type="MaterialIcons"
                size={24}
                color=""
              />
            }
          />

          <CustomTextInput
            ref={weightRef}
            label="Approx Weight (kg)"
            keyboardType="numeric"
            value={form.weight}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => declaredAmountRef.current?.focus()}
            onChangeText={text => handleChange('weight', text)}
            error={!!errors.weight}
            errorMessage={errors.weight}
            placeholderTextColor="#ccc"
            placeholder="Approx Weight"
            leftIcon={
              <CustomIcons
                name="weight-kilogram"
                type="MaterialCommunityIcons"
                size={24}
                color=""
              />
            }
          />

          <CustomPicker
            label="Shipment Type"
            selectedValue={form.shipmentType}
            onValueChange={value => handleChange('shipmentType', value)}
            items={[{label: 'Forward', value: 'F'}]}
            leftIcon={
              <CustomIcons
                name="local-shipping"
                type="MaterialIcons"
                size={24}
                color=""
              />
            }
          />

          <CustomPicker
            label="Mode of Payment"
            selectedValue={form.paymentMode}
            onValueChange={value => handleChange('paymentMode', value)}
            items={[
              {label: 'Prepaid', value: 'PREPAID'},
              {label: 'COD', value: 'COD'},
            ]}
            leftIcon={
              <CustomIcons
                name="payment"
                type="MaterialIcons"
                size={24}
                color=""
              />
            }
          />

          <CustomTextInput
            ref={declaredAmountRef}
            label="Declared Amount"
            keyboardType="numeric"
            value={form.declaredAmount}
            onSubmitEditing={onSubmit}
            onChangeText={text => handleChange('declaredAmount', text)}
            error={!!errors.declaredAmount}
            errorMessage={errors.declaredAmount}
            placeholderTextColor="#ccc"
            placeholder="Declared Amount"
            leftIcon={
              <CustomIcons
                name="currency-rupee"
                type="MaterialIcons"
                size={24}
                color=""
              />
            }
          />

          <CustomButton
            title="Calculate Rate"
            onPress={onSubmit}
            loading={loading}
            disabled={loading}
          />
        </View>

        <RateCardList rates={calculaterData} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
    gap: 16,
    padding: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default RateCalculatorForm;
