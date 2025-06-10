import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../navigation';
import {ShipmentDetails} from '../../../ProductTracking/components';

type Props = {};

const OrderDetailsScreen = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'OrderDetailsScreen'>) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ShipmentDetails order={route.params.orderDetailsData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});
