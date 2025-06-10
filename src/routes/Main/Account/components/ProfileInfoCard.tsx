import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomText} from '../../../../components';

type Props = {
  label: string;
  value: string | undefined;
};

const ProfileInfoCard = ({label, value}: Props) => (
  <View style={styles.card}>
    <CustomText variant="caption">{label}</CustomText>
    <CustomText
      variant="body"
      style={{
        fontWeight: '600',
      }}>
      {value ?? 'N/A'}
    </CustomText>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ProfileInfoCard;
