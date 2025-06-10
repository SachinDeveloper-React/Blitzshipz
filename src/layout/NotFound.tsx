import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {CustomText} from '../components';

type Props = {
  title: string;
};

const NotFound = ({title}: Props) => {
  return (
    <View style={styles.emptyContainer}>
      <LottieView
        autoPlay
        loop
        style={styles.lottie}
        source={require('../assets/animations/noDataFound.json')}
      />
      {title && (
        <CustomText variant="title" style={styles.emptyText}>
          {title}
        </CustomText>
      )}
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.5,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  emptyText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#555',
  },
});
