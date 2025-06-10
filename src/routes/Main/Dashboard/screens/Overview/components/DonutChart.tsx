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
  const pieData = data.map(item => ({
    value: item.value,
    color: item.color,
  }));

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <PieChart
          data={pieData}
          donut
          showText
          textColor="black"
          radius={80}
          innerRadius={50}
          textSize={14}
          centerLabelComponent={() => (
            <Text style={styles.centerText}>Orders</Text>
          )}
        />
        <View style={styles.legend}>
          {data.map(item => (
            <View key={item.key} style={styles.legendItem}>
              <View style={[styles.colorBox, {backgroundColor: item.color}]} />
              <Text style={styles.legendText}>{item.key}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
