import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {CustomIcons, CustomPicker} from '../../../../components';
import {useRateService} from '../../../../services';
import ShippingRateList from './ShippingRateList';

const ICON_COLOR = '#555';

const RateCardForm = () => {
  const {
    fetchRateCard,
    rateCardData,
    rateCardForm,
    rateCardLoading,
    rateCardhandleChange,
  } = useRateService();

  useEffect(() => {
    fetchRateCard();
  }, [rateCardForm]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <CustomPicker
            label="Grade"
            selectedValue={rateCardForm.standard}
            onValueChange={value => rateCardhandleChange('standard', value)}
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
                color={ICON_COLOR}
              />
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <CustomPicker
            label="Order type"
            selectedValue={rateCardForm.shipmentType}
            onValueChange={value => rateCardhandleChange('shipmentType', value)}
            items={[{label: 'Forward', value: 'Forward'}]}
            leftIcon={
              <CustomIcons
                name="payment"
                type="MaterialIcons"
                size={24}
                color={ICON_COLOR}
              />
            }
          />
        </View>
      </View>
      {rateCardLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <ShippingRateList data={rateCardData} />
      )}
    </View>
  );
};

export default RateCardForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // If you're using RN 0.71+, otherwise handle manually with margin
  },
  inputContainer: {
    width: '48%',
  },
});
