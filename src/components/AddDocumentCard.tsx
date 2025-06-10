import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {ImagePlus} from 'lucide-react-native';

const AddDocumentCard = ({onPress}: {onPress?: () => void}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.inner}>
        {/* <ImagePlus color="#666" size={24} /> */}
        <Image
          source={require('../assets/upload.png')}
          style={{
            width: 32,
            height: 32,
          }}
          resizeMode="contain"
        />
        <Text style={styles.text}>Add Document</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddDocumentCard;

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: '#999',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  inner: {
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
});
