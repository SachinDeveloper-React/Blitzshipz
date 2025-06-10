import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {LineChart} from 'react-native-gifted-charts';
import {APIDataItem, processData, vendorColors, vendors} from '../helper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useDasboardStore} from '../../../../../../store';
import {CustomText} from '../../../../../../components';

const LineChartComponent = ({
  data,
  onEndDateChange,
  onStartDateChange,
}: {
  data: APIDataItem[];
  onStartDateChange: (event: any, selectedDate: Date | undefined) => void;
  onEndDateChange: (event: any, selectedDate: Date | undefined) => void;
}) => {
  const dlData = processData(data, 'DL');
  const dtData = processData(data, 'DT');
  const bdData = processData(data, 'BD');

  const {endDate, startDate} = useDasboardStore();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Data Trends</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}>
        {Platform.OS === 'ios' ? (
          <>
            <RNDateTimePicker
              value={startDate}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={onStartDateChange}
              accentColor="#fff"
              role="button"
            />
            <RNDateTimePicker
              value={endDate}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={onEndDateChange}
              role="button"
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setShowStartPicker(!showStartPicker)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#f9f9f9',
                alignSelf: 'flex-start', // keeps it wrapped to content
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
                {startDate.toDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowEndPicker(!showEndPicker)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#f9f9f9',
                alignSelf: 'flex-start', // keeps it wrapped to content
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
                {endDate.toDateString()}
              </Text>
            </TouchableOpacity>

            {showStartPicker && (
              <RNDateTimePicker
                value={startDate}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(e, date) => {
                  onStartDateChange(e, date);
                  setShowStartPicker(false);
                }}
              />
            )}

            {showEndPicker && (
              <RNDateTimePicker
                value={endDate}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(e, date) => {
                  onEndDateChange(e, date);
                  setShowEndPicker(false);
                }}
              />
            )}
          </>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginVertical: 16,
          paddingHorizontal: 8,
        }}>
        {vendors.map(({code, name}) => (
          <View
            key={code}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginBottom: 8,
            }}>
            <View
              style={{
                width: 30,
                height: 15,
                backgroundColor: vendorColors[code],
              }}
            />
            <CustomText variant="caption">{name}</CustomText>
          </View>
        ))}
      </View>

      <LineChart
        data={dlData}
        data2={dtData}
        data3={bdData}
        animateOnDataChange={false}
        thickness={1}
        xAxisColor="#ccc"
        yAxisColor="#ccc"
        yAxisTextStyle={{fontSize: 12}}
        dataPointsColor={vendorColors.DL}
        dataPointsColor2={vendorColors.DT}
        dataPointsColor3={vendorColors.BD}
        noOfSections={10}
        xAxisLabelTextStyle={{fontSize: 8, color: 'black'}}
        initialSpacing={20}
        width={Dimensions.get('screen').width * 0.85}
        color={vendorColors.DL}
        color2={vendorColors.DT}
        color3={vendorColors.BD}
      />
    </View>
  );
};

export default memo(LineChartComponent);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    // alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
});
