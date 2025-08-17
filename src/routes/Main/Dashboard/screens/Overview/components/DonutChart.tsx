import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

type ChartItem = {
  key: string;
  value: number;
  color: string;
};

interface DonutChartProps {
  data: ChartItem[];
}

const DonutChart: React.FC<DonutChartProps> = ({data}) => {
  let pieData = data.map(item => ({
    value: item.value,
    color: item.color,
  }));

  const isEmpty = pieData.every(item => item.value === 0);

  if (isEmpty) {
    pieData = [
      {
        value: 1,
        color: '#e0e0e0',
      },
    ];
  }

  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  const pieDataWithLabels = pieData.map(item => ({
    ...item,
    text: item.value / total > 0.05 ? `${item.value}` : '', // hide if <5% of total
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders Distribution Across Zones</Text>
      <View style={styles.row}>
        <PieChart
          data={pieDataWithLabels}
          donut
          showText
          textColor="white"
          radius={80}
          textSize={8}
          showValuesAsLabels
          centerLabelComponent={() => (
            <Text style={styles.centerText}>Orders</Text>
          )}
        />
        <View style={styles.legend}>
          {data.map(item => (
            <View key={item.key} style={styles.legendItem}>
              <View style={[styles.colorBox, {backgroundColor: item.color}]} />
              <Text style={styles.legendText}>
                {item.key} : {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  centerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  legend: {
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default memo(DonutChart);
