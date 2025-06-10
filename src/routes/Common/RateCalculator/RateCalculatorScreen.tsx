import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useCallback, useState} from 'react';
import {RateCalculatorForm, RateCardForm} from './components';
import {TabBar, TabView} from 'react-native-tab-view';

type Props = {};

const RateCalculatorScreen = (props: Props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'calculator', title: 'Calculator'},
    {key: 'card', title: 'Rate Card'},
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
          activeColor="#000"
          inactiveColor="#000"
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
          case 'calculator':
            return index === 0 ? <RateCalculatorForm /> : null;
          case 'card':
            return index === 1 ? <RateCardForm /> : null;
          default:
            return null;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      lazy
      swipeEnabled={false}
      lazyPreloadDistance={0}
    />
  );
};

const styles = StyleSheet.create({
  background: {},
  scene: {flex: 1},
  tabBar: {
    backgroundColor: 'transparent',
    height: 50,
  },
  indicator: {backgroundColor: '#000', height: 1},
  label: {fontSize: 8, fontWeight: 'bold', color: '#fff'},
});

export default RateCalculatorScreen;
