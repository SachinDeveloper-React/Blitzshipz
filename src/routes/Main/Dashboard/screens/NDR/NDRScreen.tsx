import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDashboardNDRService} from '../../../../../services';
import {NdrSummaryRow} from './components';
import CustomListing from '../../../../../components/CustomListing';
import {CustomDatePickerModal} from '../../../../../components';
import {formatDate} from '../../../../../utils';
import {moderateScale} from 'react-native-size-matters';
import {Search, X} from 'lucide-react-native';

type Props = {};

const NDRScreen = (props: Props) => {
  const {
    ndrOrderList,
    statusNDR,
    totalNDR,
    loading,
    onRefresh,
    dateRange,
    exportExcelSheet,
    isDatePickerVisible,
    setDateRange,
    setIsDatePickerVisible,
    searchText,
    setSearchText,
  } = useDashboardNDRService();
  const [selectableTab, setSelectableTab] = useState<
    'Total NDR' | 'Actionable' | 'Address Issue' | 'Auto NDR'
  >('Total NDR');
  const [searchActive, setSearchActive] = useState(false);
  if (loading.ndr) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: searchActive ? 16 : 0,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {!searchActive ? (
          <>
            <View>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => setIsDatePickerVisible(true)}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                  <Text style={styles.dateText}>
                    {formatDate(dateRange.fromDate as any) ||
                      'Select From Date'}
                  </Text>
                  <Text style={styles.dateText}>-</Text>
                  <Text style={styles.dateText}>
                    {formatDate(dateRange.toDate as any) || 'Select To Date'}
                  </Text>
                </View>
              </TouchableOpacity>
              <CustomDatePickerModal
                visible={isDatePickerVisible}
                onClose={() => setIsDatePickerVisible(false)}
                date={dateRange}
                onSelect={(startDate, endDate) => {
                  setDateRange({
                    fromDate: startDate ? new Date(startDate as any) : null,
                    toDate: endDate ? new Date(endDate as any) : null,
                  });
                }}
                title="Pick Order Date"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Search onPress={() => setSearchActive(!searchActive)} />
              <TouchableOpacity onPress={exportExcelSheet}>
                <Image
                  source={require('../../../../../assets/excelImage.png')}
                  style={{width: 60, height: 60}}
                  resizeMethod="scale"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Search by Order ID or Waybill"
              style={{height: 58}}
              placeholderTextColor={'#ccc'}
              autoFocus={true}
              value={searchText}
              onChangeText={setSearchText}
            />
            <X
              onPress={() => {
                setSearchActive(!searchActive);
                setTimeout(() => {
                  setSearchText('');
                }, 100);
              }}
            />
          </>
        )}
      </View>
      <View>
        {statusNDR?.data && (
          <NdrSummaryRow
            data={statusNDR?.data}
            activeTab={selectableTab}
            // onPress={item => {
            //   if (item.label !== 'Auto NDR') {
            //     setSelectableTab(
            //       item.label as
            //         | 'Total NDR'
            //         | 'Actionable'
            //         | 'Address Issue'
            //         | 'Auto NDR',
            //     );
            //   }
            // }}
          />
        )}
      </View>

      <CustomListing
        data={ndrOrderList}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshNdr}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default NDRScreen;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: moderateScale(10),
    borderRadius: 999,
  },
  dateText: {
    fontSize: moderateScale(10),
    color: '#000',
  },
});
