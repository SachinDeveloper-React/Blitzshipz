import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = ImageProps & {
  vendorCode: 'BD' | 'DT' | 'DX' | 'DL' | 'BZ' | string;
};

const VendorIcons = ({vendorCode, ...props}: Props) => {
  return (
    <Image
      {...props}
      source={
        vendorCode === 'BD'
          ? require('../assets/logo/bluedart.png')
          : vendorCode === 'DT'
          ? require('../assets/logo/dtdc.jpg')
          : ['EX', 'DX'].includes(vendorCode)
          ? require('../assets/logo/Express.png')
          : vendorCode === 'DL'
          ? require('../assets/logo/delhivery.webp')
          : ''
      }
      style={{
        width: 60,
        height: 60,
        borderRadius: 8,
      }}
      resizeMode="contain"
      resizeMethod="scale"
    />
  );
};

export default VendorIcons;

const styles = StyleSheet.create({});
