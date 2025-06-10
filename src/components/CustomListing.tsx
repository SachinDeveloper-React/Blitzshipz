import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NotFound} from '../layout';
import CustomCard from './CustomCard';
import {NDROrder} from '../store';
import {navigate} from '../navigation';
import {RaisedTicketModal} from '../routes/Settings/Support';
import {OrderItem} from '../types';

type Props = {
  data: NDROrder[] | OrderItem[] | any;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  refreshControl?: any;
};

const CustomListing = (props: Props) => {
  const {data} = props;
  const [raisedTicket, setRaisedTicket] = useState(false);
  const [selectedAWBId, setSelectedAWBId] = useState<string>('');

  const toggleRaisedModel = (id: string) => {
    setRaisedTicket(!raisedTicket);
    setSelectedAWBId(id);
  };

  const renderItem = ({item}: {item: NDROrder | OrderItem | any}) => {
    return (
      <CustomCard
        order={item}
        onLongPress={() => toggleRaisedModel(String(item.waybill))}
        onPress={() =>
          navigate('ProductTracking', {
            id: item.id,
            wayBill: item.waybill,
          })
        }
      />
    );
  };

  return (
    <>
      <FlatList
        {...props}
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={10}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<NotFound title="No data found" />}
      />
      <RaisedTicketModal
        awb={selectedAWBId}
        visible={raisedTicket}
        onClose={() => toggleRaisedModel('')}
      />
    </>
  );
};

export default CustomListing;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
