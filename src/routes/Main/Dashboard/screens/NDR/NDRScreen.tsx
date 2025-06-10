import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDashboardNDRService} from '../../../../../services';
import {NdrSummaryRow} from './components';
import CustomListing from '../../../../../components/CustomListing';

type Props = {};

const NDRScreen = (props: Props) => {
  const {ndrOrderList, statusNDR, totalNDR, loading, onRefresh} =
    useDashboardNDRService();
  const [selectableTab, setSelectableTab] = useState<
    'Total NDR' | 'Actionable' | 'Address Issue' | 'Auto NDR'
  >('Total NDR');
  if (loading.ndr) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {statusNDR?.data && (
          <NdrSummaryRow
            data={statusNDR?.data}
            activeTab={selectableTab}
            onPress={item => {
              if (item.label !== 'Auto NDR') {
                setSelectableTab(
                  item.label as
                    | 'Total NDR'
                    | 'Actionable'
                    | 'Address Issue'
                    | 'Auto NDR',
                );
              }
            }}
          />
        )}
      </View>

      <CustomListing
        data={
          selectableTab === 'Total NDR'
            ? totalNDR
            : selectableTab === 'Actionable'
            ? ndrOrderList?.data.actionableOrders
            : ndrOrderList?.data.addressIssueOrders
        }
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
