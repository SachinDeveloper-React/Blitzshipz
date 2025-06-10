import React, {useState, useCallback} from 'react';
import {StyleSheet, useWindowDimensions, ImageBackground} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {
  CancelledScreen,
  LostScreen,
  NDRScreen,
  OrdersScreen,
  OverviewScreen,
  RTOScreen,
} from '../screens';

const TabViewComponent = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'overview', title: 'Overview'},
    {key: 'orders', title: 'Orders'},
    {key: 'ndr', title: 'NDR'},
    {key: 'rto', title: 'RTO'},
    {key: 'cancelled', title: 'Cancelled'},
    {key: 'lost', title: 'Lost'},
  ]);

  const renderTabBar = useCallback(
    (props: any) => (
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1550895030-823330fc2551?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBhdHRlcm58ZW58MHx8MHx8fDA%3D',
        }}
        style={styles.background}>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          scrollEnabled={true}
          activeColor="#000"
          inactiveColor="#000"
          tabStyle={
            {
              // width: 150,
            }
          }
          labelStyle={styles.label}
        />
      </ImageBackground>
    ),
    [],
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={({route}) => {
        switch (route.key) {
          case 'overview':
            return index === 0 ? <OverviewScreen /> : null;
          case 'orders':
            return index === 1 ? <OrdersScreen /> : null;
          case 'ndr':
            return index === 2 ? <NDRScreen /> : null;
          case 'rto':
            return index === 3 ? <RTOScreen /> : null;
          case 'cancelled':
            return index === 4 ? <CancelledScreen /> : null;
          case 'lost':
            return index === 5 ? <LostScreen /> : null;
          default:
            return null;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      lazy
      lazyPreloadDistance={0}
    />
  );
};

const styles = StyleSheet.create({
  background: {},
  scene: {flex: 1},
  tabBar: {backgroundColor: 'transparent'},
  indicator: {backgroundColor: '#000', height: 1},
  label: {fontSize: 8, fontWeight: 'bold', color: '#fff'},
});

export default TabViewComponent;
