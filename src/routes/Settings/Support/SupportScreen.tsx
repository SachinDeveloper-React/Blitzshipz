import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Text} from 'react-native';
import {RootStackParamList} from '../../../navigation';
import {CustomIcons} from '../../../components';
import {useSettingService} from '../../../services';
import {RaisedTicketModal} from './components';

type Ticket = {
  id: string;
  ticketNumber: string;
  awbNumber: string;
  userId: string;
  userRef: string;
  createdDate: string;
  modifyDate: string | null;
  closedDate: string | null;
  status: string;
  description: string;
  category: string;
  orderId: string | null;
  subCategory: string;
  readBySupport: boolean;
};

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'RESOLVED':
      return '#27ae60';
    case 'PENDING':
      return '#f39c12';
    case 'OPEN':
      return '#3498db';
    default:
      return '#7f8c8d';
  }
};

const TicketCard = ({item, onPress}: {item: Ticket; onPress?: () => void}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.ticketNumber}>#{item.ticketNumber}</Text>
        <View
          style={[
            styles.statusPill,
            {backgroundColor: getStatusColor(item.status)},
          ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.label}>AWB:</Text>
      <Text style={styles.value}>{item.awbNumber}</Text>

      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>
        {item.category} - {item.subCategory}
      </Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{item.description}</Text>

      <Text style={styles.label}>Created:</Text>
      {/* <Text style={styles.value}>{format(new Date(item.createdDate), 'dd MMM yyyy, hh:mm a')}</Text> */}
      <Text style={styles.value}>
        {new Date(item.createdDate).toLocaleString()}
      </Text>

      {item?.closedDate ? (
        <>
          <Text style={styles.label}>Closed:</Text>
          <Text style={styles.value}>
            {new Date(item?.closedDate).toLocaleString()}
          </Text>
        </>
      ) : (
        <></>
      )}
    </Pressable>
  );
};

export default function TicketsScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'SupportScreen'>) {
  const {tickets, loading, onRefresh, error, refreshLoading} =
    useSettingService({
      initial: true,
    });
  const [raisedTicket, setRaisedTicket] = useState(false);

  const toggleRaisedModel = () => setRaisedTicket(!raisedTicket);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={toggleRaisedModel} style={{marginRight: 15}}>
            <CustomIcons type="AntDesign" name="plus" size={20} color="blue" />
          </Pressable>
        );
      },
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.main_container}>
        <FlatList
          data={tickets}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
          renderItem={({item}) => (
            <TicketCard
              item={item}
              onPress={() =>
                navigation.navigate('ChatSupportScreen', {
                  ticketId: item.ticketNumber,
                  AWB_NO: item.awbNumber,
                  category_SubCategory: `${item.category}/${item.subCategory}`,
                  status: item.status,
                  id: item.id,
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          refreshControl={
            <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
          }
          updateCellsBatchingPeriod={10}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
        />
        <RaisedTicketModal visible={raisedTicket} onClose={toggleRaisedModel} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  statusPill: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  label: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
});
