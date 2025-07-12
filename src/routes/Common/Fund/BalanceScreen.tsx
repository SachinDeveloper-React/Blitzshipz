import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import {useFundService} from '../../../services';
import {CustomIcons} from '../../../components';
import {
  DeductionsScreen,
  RechargesScreen,
  RefundsScreen,
  TransactionsScreen,
} from './Screens';

type Props = NativeStackScreenProps<RootStackParamList, 'BalanceScreen'>;

const BalanceScreen = ({navigation}: Props) => {
  const {balance} = useFundService();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'transactions', title: 'Transactions'},
    {key: 'recharges', title: 'Recharges'},
    {key: 'refunds', title: 'Refunds'},
    {key: 'deductions', title: 'Deductions'},
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerBalanceContainer}>
          <CustomIcons
            type="MaterialIcons"
            name="account-balance-wallet"
            size={18}
            color="#333"
          />
          <Text style={styles.headerBalanceText}>₹{balance}</Text>
        </View>
      ),
    });
  }, [navigation, balance]);

  const renderTabBar = useCallback(
    (props: any) => (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        scrollEnabled
        activeColor="#000"
        inactiveColor="#555"
        labelStyle={styles.tabLabel}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.balanceLabel}>Total Balance: ₹{balance}</Text>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Fund</Text>
          </Pressable>
        </View>

        <TabView
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'transactions':
                return index === 0 ? <TransactionsScreen /> : null;
              case 'recharges':
                return index === 1 ? <RechargesScreen /> : null;
              case 'refunds':
                return index === 2 ? <RefundsScreen /> : null;
              case 'deductions':
                return index === 3 ? <DeductionsScreen /> : null;
              default:
                return null;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
          swipeEnabled
          lazy
          lazyPreloadDistance={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    backgroundColor: '#f9f9fb',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    borderRadius: 20,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButtonText: {
    fontSize: 12,
    color: '#000',
  },
  headerBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 10,
  },
  walletIcon: {
    marginRight: 6,
  },
  headerBalanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  indicator: {
    backgroundColor: '#000',
    height: 3,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sceneText: {
    padding: 20,
    fontSize: 14,
    color: '#333',
  },
});
