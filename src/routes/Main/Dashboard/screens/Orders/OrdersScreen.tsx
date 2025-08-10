import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  TextInput,
  Image,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDashboardService} from '../../../../../services';
import {OrderList} from './components';
import {CustomDatePickerModal, CustomText} from '../../../../../components';
import {useDashboardFilterStore} from '../../../../../store';
import {Search, X} from 'lucide-react-native';
import {exportExcel, formatDate, showToast} from '../../../../../utils';
import {DateType} from 'react-native-ui-datepicker';
import {fetchFilterData} from '../../../../../networking';
import {moderateScale} from 'react-native-size-matters';

type Props = {};

const OrdersScreen = (props: Props) => {
  const {orderFilterUser, filterData, totalElements} = useDashboardService();
  const {totalPages, currentPage} = useDashboardFilterStore();
  const [loading, setLoading] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'Manifested' | 'Not Picked' | 'In Transit' | 'Dispatched' | 'Delivered'
  >('Manifested');

  const [refresh, setRefresh] = useState(false);
  const [moreload, setMoreload] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState<{
    toDate: DateType | null;
    fromDate: DateType | null;
  }>({
    toDate: null,
    fromDate: null,
  });

  const [searchText, setSearchText] = useState('');

  const onRefresh = async () => {
    setRefresh(true);
    const body = {
      waybill: '',
      status: selectedTab,
      rtoMarked:
        selectedTab === 'In Transit' || selectedTab === 'Dispatched'
          ? false
          : null,
      orderLive: true,
    };

    await orderFilterUser(body as any, currentPage);
    setRefresh(false);
  };
  const moreLoad = async () => {
    if (moreload) return;

    if (currentPage >= totalPages) return;
    setMoreload(true);
    const body = {
      waybill: '',
      status: selectedTab,
      rtoMarked:
        selectedTab === 'In Transit' || selectedTab === 'Dispatched'
          ? false
          : null,
      orderLive: true,
    };

    await orderFilterUser(body as any, currentPage);
    setMoreload(false);
  };

  const exportExcelSheet = async () => {
    try {
      if (!dateRange.fromDate || !dateRange.toDate) {
        showToast('Please select both a start and end date to continue.');
        return;
      }

      setExcelLoading(true);
      const body = {
        day: 0,
        fromDate: formatDate(dateRange.fromDate) ?? '',
        orderId: '',
        paymentMode: '',
        phoneNumber: '',
        productCategory: '',
        referenceNumber: '',
        status: null,
        toDate: formatDate(dateRange.toDate) ?? '',
        waybill: '',
      };

      const excelData = await fetchFilterData(body);

      if (excelData.data.content.length === 0) {
        showToast('No records available to export.');
        return;
      }

      await exportExcel(excelData.data.content || [], 'Orders');
      setIsDatePickerVisible(false);
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    } finally {
      setExcelLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      const isOrderId = searchText.startsWith('AT');
      const body = {
        waybill: isOrderId ? '' : searchText,
        status: selectedTab,
        rtoMarked:
          selectedTab === 'In Transit' || selectedTab === 'Dispatched'
            ? false
            : null,
        orderLive: true,

        orderId: isOrderId ? searchText : '',
      };

      await orderFilterUser(body as any, 0);
      setLoading(false);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchText, selectedTab]);

  const toggleDropdown = () => setShowStatusDropdown(prev => !prev);

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowStatusDropdown(false)}>
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

      <View style={styles.header}>
        <CustomText style={styles.title}>
          {filterData.length > 0
            ? selectedTab === 'Manifested'
              ? 'Pickups'
              : selectedTab
            : 'Order List'}{' '}
          {totalElements || ''}
        </CustomText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Search onPress={() => setSearchActive(!searchActive)} />
            {/* <TouchableOpacity onPress={exportExcelSheet}> */}
            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
              <Image
                source={require('../../../../../assets/excelImage.png')}
                style={{width: 50, height: 50}}
                resizeMethod="scale"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleDropdown}>
            <CustomText style={styles.filterToggle}>
              {selectedTab === 'Manifested' ? 'Pickups' : selectedTab} ▾
            </CustomText>
          </TouchableOpacity>
        </View>
        {showStatusDropdown && (
          <Pressable
            style={styles.dropdown}
            onStartShouldSetResponder={() => true}
            onTouchEnd={e => e.stopPropagation()}>
            <CustomText
              style={{paddingVertical: 10}}
              onPress={() => {
                setSelectedTab('Manifested');
                setShowStatusDropdown(false);
              }}>
              Pickups
            </CustomText>
            <CustomText
              style={{paddingVertical: 10}}
              onPress={() => {
                setSelectedTab('Not Picked');
                setShowStatusDropdown(false);
              }}>
              Not Picked
            </CustomText>
            <CustomText
              style={{paddingVertical: 10}}
              onPress={() => {
                setSelectedTab('In Transit');
                setShowStatusDropdown(false);
              }}>
              In Transit
            </CustomText>
            <CustomText
              style={{paddingVertical: 10}}
              onPress={() => {
                setSelectedTab('Dispatched');
                setShowStatusDropdown(false);
              }}>
              Dispatched
            </CustomText>
            <CustomText
              style={{paddingVertical: 10}}
              onPress={() => {
                setSelectedTab('Delivered');
                setShowStatusDropdown(false);
              }}>
              Delivered
            </CustomText>
          </Pressable>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <OrderList
          orders={filterData as any}
          onRefresh={onRefresh}
          refresh={refresh}
          onLoad={moreLoad}
          ListFooterComponent={() => moreload && <ActivityIndicator />}
        />
      )}

      <CustomDatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSubmit={() => {
          exportExcelSheet();
        }}
        date={dateRange}
        loading={excelLoading}
        onSelect={(startDate, endDate) => {
          setDateRange({
            fromDate: startDate ? new Date(startDate as any) : null,
            toDate: endDate ? new Date(endDate as any) : null,
          });
        }}
        title="Pick Order Date"
      />
    </Pressable>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'relative',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    zIndex: 99999999999,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterToggle: {
    color: '#007bff',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    zIndex: 1000,
    elevation: 4,
    alignItems: 'flex-end',
  },
  loader: {
    marginTop: 20,
  },
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
