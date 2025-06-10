import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {CustomText} from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '../../../navigation';

const options = [
  {
    label: 'Banking Details',
    icon: 'card-outline',
    navigate: 'BankingDetailsScreen',
  },
  {label: 'My Products', icon: 'cube-outline', navigate: 'MyProductScreen'},
  {
    label: 'My Documents',
    icon: 'document-text-outline',
    navigate: 'MyDocumentsScreen',
  },
];

const ProfileOtherDetailsScreen = () => {
  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          style={styles.item}
          onPress={() => navigate(item.navigate as any)}>
          <View style={styles.left}>
            <Icon name={item.icon} size={22} color="#007AFF" />
            <CustomText style={styles.label}>{item.label}</CustomText>
          </View>
          <Icon name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileOtherDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
