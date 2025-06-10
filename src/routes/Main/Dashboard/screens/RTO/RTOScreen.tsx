import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {useDashboardRTOService} from '../../../../../services';
import {CustomText} from '../../../../../components';
import {OrderList} from '../Orders/components';

type Props = {};

const RTOScreen = (props: Props) => {
  const {
    loading,
    selectedTab,
    setSelectedTab,
    setShowStatusDropdown,
    showStatusDropdown,
    toggleDropdown,
    rtoData,
    onRefresh,
    moreLoad,
    totalElements,
  } = useDashboardRTOService();

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowStatusDropdown(false)}>
      <View style={styles.header}>
        <CustomText style={styles.title}>
          {selectedTab} {totalElements || 0}
        </CustomText>

        <TouchableOpacity onPress={toggleDropdown}>
          <CustomText style={styles.filterToggle}>{selectedTab} ▾</CustomText>
        </TouchableOpacity>
        {showStatusDropdown && (
          <Pressable
            style={styles.dropdown}
            onStartShouldSetResponder={() => true}
            onTouchEnd={e => e.stopPropagation()}>
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

      {loading.rto ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <OrderList
          orders={rtoData as any}
          onRefresh={onRefresh}
          refresh={loading.refreshRTO}
          onLoad={moreLoad}
        />
      )}
    </Pressable>
  );
};

export default RTOScreen;

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
