import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from './CustomText';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
};

const ExcelHeader = ({onPress, title, loading = false}: Props) => {
  return (
    <View style={styles.header}>
      <CustomText
        variant="subtitle"
        style={{fontWeight: '600', fontSize: 16, marginLeft: 4}}>
        {title}
      </CustomText>

      {loading ? (
        <ActivityIndicator style={{padding: 6}} size={30} />
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 6,
            borderRadius: 8,
          }}
          activeOpacity={0.7}>
          <Image
            source={require('../assets/excelImage.png')}
            style={{width: 40, height: 40}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExcelHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 2,
    borderBottomWidth: 0.5,
    borderColor: '#e0e0e0',
  },
});
