import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {CustomText} from '../../../../../../components';

const VendorChart = ({vendorOptions}: any) => {
  const chartData = Object.values(vendorOptions).map((vendor: any) => ({
    value: vendor.totalAmount,
    label: vendor.vendorName,
    frontColor: '#0a2f50',
  }));

  return (
    <View style={styles.container}>
      <CustomText variant="title" style={styles.title}>
        Price Comparision
      </CustomText>
      <BarChart
        data={chartData}
        barInnerComponent={(item: any) => (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CustomText
              style={{color: 'white', fontSize: 6, fontWeight: '600'}}>
              Rs. {Number(item.value).toFixed(2)}
            </CustomText>
          </View>
        )}
        spacing={30}
        // hideRules
        yAxisThickness={0}
        xAxisThickness={1}
        adjustToWidth
        xAxisColor={'#ccc'}
        yAxisTextStyle={{color: '#555'}}
        xAxisLabelTextStyle={{color: '#333', fontSize: 12}}
        isAnimated
      />
    </View>
  );
};

export default VendorChart;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    // fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});
