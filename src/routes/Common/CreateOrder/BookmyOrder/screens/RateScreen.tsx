import {FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useBookmyOrderAndRateService} from '../../../../../services';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../navigation';
import PricingCard from './components/PricingCard';

type Props = {};

const RateScreen = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'RateScreen'>) => {
  const {id} = route.params;
  const {fetchRates, ratesData} = useBookmyOrderAndRateService();

  useEffect(() => {
    fetchRates(id);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={ratesData?.basePricing}
          keyExtractor={(item, index) => `${item.vendorCode}-${index}`}
          scrollEnabled={false}
          renderItem={({item}) => (
            <PricingCard
              vendorName={item.vendorCode}
              weight={item.weight}
              estimatedPickup={'Saturday 10 May'}
              rtoCharges={item.rto}
              zone={item.zone}
              price={item.amount}
              onChoose={() => {
                console.log('Chosen vendor:', item.vendorCode);
              }}
            />
          )}
        />
        <FlatList
          data={ratesData?.advancePricing}
          keyExtractor={(item, index) => `${item.vendorCode}-${index}`}
          scrollEnabled={false}
          renderItem={({item}) => (
            <PricingCard
              vendorName={item.vendorCode}
              weight={item.weight}
              estimatedPickup={'Saturday 10 May'}
              rtoCharges={item.rto}
              zone={item.zone}
              price={item.amount}
              onChoose={() => {
                console.log('Chosen vendor:', item.vendorCode);
              }}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RateScreen;

const styles = StyleSheet.create({});
