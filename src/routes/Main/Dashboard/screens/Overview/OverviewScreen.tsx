import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {
  DonutChart,
  LineChartComponent,
  OverviewOrder,
  RevenueList,
  TodayPickupList,
} from './components';
import {useDashboardService} from '../../../../../services';
import {CustomText} from '../../../../../components';

const OverviewScreen = () => {
  const {
    graphData,
    overviewData,
    endDate,
    setEndDate,
    setStartDate,
    startDate,
    fetchOrderLineGraph,
    revenueData,
    fetchOrderRevenue,
    onDashboardRefresh,
    dashBoardLoading,
    paiChartData,
    pickupData,
  } = useDashboardService();

  if (dashBoardLoading.loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={dashBoardLoading.refresh}
            onRefresh={onDashboardRefresh}
          />
        }>
        <FlatList
          data={overviewData}
          scrollEnabled={false}
          keyExtractor={item => item.title}
          numColumns={2}
          renderItem={({item}) => (
            <OverviewOrder
              title={item.title}
              count={item.count}
              icon={item.icon}
              color={item.color}
            />
          )}
          columnWrapperStyle={styles.row}
        />
        <DonutChart data={paiChartData} />

        <View
          style={[
            styles.cardStyle,
            {
              marginTop: 10,
            },
          ]}>
          <CustomText style={styles.cardHeader}>Today's Pickups</CustomText>
          <TodayPickupList data={(pickupData as any) || []} />
        </View>

        <LineChartComponent
          data={graphData || []}
          onStartDateChange={function (
            event: any,
            selectedDate: Date | undefined,
          ): void {
            if (selectedDate) {
              setStartDate(selectedDate);
              const formattedStateDate = selectedDate
                .toISOString()
                .split('T')[0];
              const formattedEndDate = endDate.toISOString().split('T')[0];
              fetchOrderLineGraph(formattedStateDate, formattedEndDate);
              fetchOrderRevenue(formattedStateDate, formattedEndDate);
            }
          }}
          onEndDateChange={function (
            event: any,
            selectedDate: Date | undefined,
          ): void {
            if (selectedDate) {
              setEndDate(selectedDate);
              const formattedStateDate = startDate.toISOString().split('T')[0];
              const formattedEndDate = selectedDate.toISOString().split('T')[0];
              fetchOrderLineGraph(formattedStateDate, formattedEndDate);
              fetchOrderRevenue(formattedStateDate, formattedEndDate);
            }
          }}
        />
        <View
          style={[
            styles.cardStyle,
            {
              marginBottom: 10,
            },
          ]}>
          <CustomText style={styles.cardHeader}>
            Latest 7 days revenue
          </CustomText>
          <RevenueList data={revenueData as any} />
        </View>
      </ScrollView>
    </View>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
