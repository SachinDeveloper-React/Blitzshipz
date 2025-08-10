import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import {ShipmentDetails, TrackingTimeline} from './components';
import {useTrackingService} from '../../../services';
import {CustomIcons} from '../../../components';
import {RaisedTicketModal} from '../../Settings/Support';
import {theme} from '../../../utils';

const ProductTrackingScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'ProductTracking'>) => {
  const {id, wayBill} = route.params;
  const {statusTimeline, data, loading, onRefresh} = useTrackingService({
    id,
    wayBill,
  });

  const scrollRef = useRef<ScrollView>(null);
  const [shipmentDetailsY, setShipmentDetailsY] = useState<number | null>(null);
  const [raisedTicket, setRaisedTicket] = useState(false);
  const [selectedAWBId, setSelectedAWBId] = useState<string>('');

  const toggleRaisedModel = (id: string) => {
    setRaisedTicket(!raisedTicket);
    setSelectedAWBId(id);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => toggleRaisedModel(String(wayBill))}>
          <CustomIcons
            name="support-agent"
            type="MaterialIcons"
            size={26}
            color="#000"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (shipmentDetailsY !== null && data) {
      scrollRef.current?.scrollTo({
        y: shipmentDetailsY - theme.dimensions.height * 0.2,
        animated: true,
      });
    }
  }, [shipmentDetailsY, data]);

  if (loading.trackTimeLine || loading.trackOrderData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={
              loading.refreshTrackTimeLine || loading.refreshTrackOrderData
            }
            onRefresh={onRefresh}
          />
        }>
        <TrackingTimeline data={statusTimeline} />

        <View
          onLayout={e => {
            const y = e.nativeEvent.layout.y;
            setShipmentDetailsY(y);
          }}>
          <ShipmentDetails order={data} />
        </View>
        <RaisedTicketModal
          awb={selectedAWBId}
          visible={raisedTicket}
          onClose={() => toggleRaisedModel('')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductTrackingScreen;

const styles = StyleSheet.create({});
