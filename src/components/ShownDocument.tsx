import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ShownDocument = ({
  onPress,
  uri,
}: {
  onPress?: () => void;
  uri: string | undefined;
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.inner}>
        <Image
          source={{
            uri: uri,
          }}
          resizeMethod="auto"
          resizeMode="contain"
          style={{
            height: 100,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ShownDocument;

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: '#999',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  inner: {
    // alignItems: 'center',
  },
  text: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
});
