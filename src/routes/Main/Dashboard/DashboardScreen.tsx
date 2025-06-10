import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {TabViewComponent} from './components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabParamList, navigate} from '../../../navigation';
import {CustomIcons} from '../../../components';
import {useFundService} from '../../../services';
import {useAuthStore} from '../../../store';
import AnimatedWarningBanner from '../../../components/AnimatedWarningBanner';

const DashboardScreen = ({
  navigation,
}: NativeStackScreenProps<BottomTabParamList, 'Dashboard'>) => {
  const {balance} = useFundService();
  const {user} = useAuthStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('BalanceScreen')}
          style={styles.balanceContainer}>
          <View style={styles.iconAndText}>
            <CustomIcons
              type="MaterialIcons"
              name="account-balance-wallet"
              size={18}
              color="#333"
            />
            <Text style={styles.balanceText}>₹{balance.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, balance]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      <AnimatedWarningBanner
        message="Verify Your Email"
        message2="Make sure you verify your E mail and Documents before creating an Order"
        visible={(!user?.emailVerified || !user?.verified) ?? false}
      />
      <TabViewComponent />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  balanceContainer: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  balanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    marginRight: 6,
  },
});
