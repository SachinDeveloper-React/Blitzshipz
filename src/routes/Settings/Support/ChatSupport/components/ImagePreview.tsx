import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const ImagePreview = ({
  imageUri,
  onRemove,
}: {
  imageUri: string;
  onRemove: () => void;
}) => (
  <View
    style={{
      position: 'relative',
      padding: 8,
      ...Platform.select({
        ios: {
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
          backgroundColor: '#fff',
        },
      }),
    }}>
    <View style={{position: 'relative', width: 50, height: 50}}>
      <Image
        source={{uri: imageUri}}
        resizeMode="cover"
        style={{width: 50, height: 50, borderRadius: 4}}
      />
      <Pressable onPress={onRemove} style={styles.removeBtn}>
        <Text style={styles.removeText}>×</Text>
      </Pressable>
    </View>
  </View>
);

export default ImagePreview;

const styles = StyleSheet.create({
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#000',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  removeText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 12,
  },
});
