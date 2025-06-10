import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDashboardService} from '../../../../../services';
import {OrderList} from './components';
import {CustomText} from '../../../../../components';
import {useDashboardFilterStore} from '../../../../../store';

type Props = {};

const OrdersScreen = (props: Props) => {
  const {orderFilterUser, filterData, totalElements} = useDashboardService();
  const {totalPages, currentPage} = useDashboardFilterStore();
  const [loading, setLoading] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'Manifested' | 'In Transit' | 'Dispatched' | 'Delivered'
  >('Manifested');

  const [refresh, setRefresh] = useState(false);
  const [moreload, setMoreload] = useState(false);

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

  useEffect(() => {
    (async () => {
      setLoading(true);
      const body = {
        waybill:
          selectedTab === 'Manifested'
            ? ''
            : selectedTab === 'In Transit'
            ? ''
            : selectedTab === 'Dispatched'
            ? ''
            : selectedTab === 'Delivered'
            ? ''
            : '',
        status: selectedTab,
        rtoMarked:
          selectedTab === 'Manifested'
            ? null
            : selectedTab === 'In Transit'
            ? false
            : selectedTab === 'Dispatched'
            ? false
            : selectedTab === 'Delivered'
            ? null
            : null,
        orderLive:
          selectedTab === 'Manifested'
            ? true
            : selectedTab === 'In Transit'
            ? true
            : selectedTab === 'Dispatched'
            ? true
            : selectedTab === 'Delivered'
            ? true
            : null,
      };

      await orderFilterUser(body as any, 0);
      setLoading(false);
    })();
  }, [selectedTab]);

  const toggleDropdown = () => setShowStatusDropdown(prev => !prev);

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowStatusDropdown(false)}>
      <View style={styles.header}>
        <CustomText style={styles.title}>
          {selectedTab === 'Manifested' ? 'Pickups' : selectedTab}{' '}
          {totalElements || 0}
        </CustomText>

        <TouchableOpacity onPress={toggleDropdown}>
          <CustomText style={styles.filterToggle}>
            {selectedTab === 'Manifested' ? 'Pickups' : selectedTab} ▾
          </CustomText>
        </TouchableOpacity>
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
        />
      )}
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
    padding: 16,
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
});
