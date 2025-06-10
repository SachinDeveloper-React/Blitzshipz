import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTrackingStore} from '../../store';
import {TrackingApi} from '../../networking';

type Props = {
  id: string;
  wayBill: string;
};

const useTrackingService = ({id, wayBill}: Props) => {
  const {
    clearTrackingData,
    data,
    setStatusTimeline,
    setTrackingData,
    statusTimeline,
  } = useTrackingStore();

  const [loading, setLoading] = useState({
    trackTimeLine: false,
    refreshTrackTimeLine: false,
    trackOrderData: false,
    refreshTrackOrderData: false,
  });

  const trackOrderTimeLine = async (refresh?: boolean) => {
    try {
      if (refresh) setLoading(prev => ({...prev, refreshTrackTimeLine: true}));
      else setLoading(prev => ({...prev, trackTimeLine: true}));
      const response = await TrackingApi.trackOrder(id);

      if (response.code === 200 && !response.error) {
        setStatusTimeline(response.data);
      }
    } catch (error) {
      console.log(`DEBUG: ${error}`);
    } finally {
      setLoading(prev => ({
        ...prev,
        refreshTrackTimeLine: false,
        trackTimeLine: false,
      }));
    }
  };
  const trackOrderDeatils = async (refresh?: boolean) => {
    try {
      if (refresh) setLoading(prev => ({...prev, refreshTrackOrderData: true}));
      else setLoading(prev => ({...prev, trackOrderData: true}));
      const response = await TrackingApi.findOrderDeatils(
        {waybill: wayBill},
        0,
      );

      if (response.code === 200 && !response.error) {
        setTrackingData(response.data.content[0]);
      }
    } catch (error) {
      console.log(`DEBUG: ${error}`);
    } finally {
      setLoading(prev => ({
        ...prev,
        refreshTrackOrderData: false,
        trackOrderData: false,
      }));
    }
  };

  const onRefresh = async () => {
    await Promise.all([trackOrderTimeLine(true), trackOrderDeatils(true)]);
  };

  useEffect(() => {
    (async () => {
      await Promise.all([trackOrderTimeLine(), trackOrderDeatils()]);
    })();
  }, []);

  return {statusTimeline, data, onRefresh, loading};
};

export default useTrackingService;

const styles = StyleSheet.create({});
