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
    excelLoading,
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
        {searchActive && (
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 24,
              }}>
              <Search onPress={() => setSearchActive(!searchActive)} />
              <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
                <Image
                  source={require('../../../../../assets/excelImage.png')}
                  style={{width: 60, height: 60}}
                  resizeMethod="scale"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
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
        onSubmit={() => {
          exportExcelSheet();
        }}
        loading={excelLoading}
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
