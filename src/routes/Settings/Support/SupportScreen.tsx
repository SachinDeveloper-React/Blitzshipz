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
  TouchableOpacity,
  Text,
} from 'react-native';
import {RootStackParamList} from '../../../navigation';
import {CustomIcons} from '../../../components';
import {useSettingService} from '../../../services';
import {
  FilterPillRow,
  FilterTicketModel,
  RaisedTicketModal,
} from './components';
import {formatDate} from '../../../utils';
import {NotFound} from '../../../layout';

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
      <Text style={styles.value}>
        {new Date(item.createdDate).toLocaleString()}
      </Text>

      {item.closedDate && (
        <>
          <Text style={styles.label}>Closed:</Text>
          <Text style={styles.value}>
            {new Date(item.closedDate).toLocaleString()}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default function TicketsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SupportScreen'>) {
  const {
    tickets,
    loading,
    onRefresh,
    refreshLoading,
    categoryList,
    filterInput,
    handleFilter,
    filterInputList,
    loadMore,
  } = useSettingService({initial: true});

  const [raisedTicket, setRaisedTicket] = useState(false);
  const [filterTicket, setFilterTicket] = useState(false);
  const toggleRaisedModel = () => setRaisedTicket(prev => !prev);
  const toggleFilterModel = () => setFilterTicket(prev => !prev);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={toggleRaisedModel} style={{marginRight: 15}}>
          <CustomIcons type="AntDesign" name="plus" size={20} color="blue" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={{flex: 1}}>
        <View style={styles.categoryWrapper}>
          <FilterPillRow
            data={categoryList}
            selectedValue={filterInput.category}
            onSelect={value => handleFilter('category', value)}
          />
        </View>
        <View style={styles.categoryWrapper}>
          <View style={{flexDirection: 'row'}}>
            <FilterPillRow
              data={filterInputList}
              selectedValue={filterInput.status}
              onSelect={value => handleFilter('status', value)}
            />
            <TouchableOpacity
              onPress={toggleFilterModel}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <CustomIcons
                name="filter"
                type="Feather"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

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
          refreshControl={
            <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => <NotFound title="No data found" />}
          removeClippedSubviews
          updateCellsBatchingPeriod={10}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>

      <RaisedTicketModal visible={raisedTicket} onClose={toggleRaisedModel} />
      <FilterTicketModel
        visible={filterTicket}
        onClose={toggleFilterModel}
        onApplyFilter={({
          category,
          subCategory,
          createdDateFrom,
          createdDateTo,
        }) => {
          const createdDateFromFormat = formatDate(createdDateFrom);
          const createdDateToFormat = formatDate(createdDateTo);
          console.log(createdDateFromFormat, createdDateToFormat);
          handleFilter('category', category);
          handleFilter('subCategory', subCategory);
          handleFilter('createdDateFrom', createdDateFromFormat);
          handleFilter('createdDateTo', createdDateToFormat);
        }}
        onResetFilter={() => {
          handleFilter('category', null);
          handleFilter('subCategory', '');
          handleFilter('createdDateFrom', '');
          handleFilter('createdDateTo', '');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryWrapper: {
    // height: 80,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  categoryListContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  categoryPill: {
    height: 36,
    justifyContent: 'center', // Vertically center text
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
    includeFontPadding: false, // Android fix
    textAlignVertical: 'center', // Android fix
  },
});
