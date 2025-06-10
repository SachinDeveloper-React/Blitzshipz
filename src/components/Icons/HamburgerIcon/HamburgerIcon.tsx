// components/HamburgerIcon.tsx
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

type Props = {
  onPress: () => void;
  tintColor: any;
  align?: 'left' | 'right';
};

const HamburgerIcon = ({onPress, tintColor, align = 'left'}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.line,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.line,
          {
            width: 15,
            alignSelf: align == 'left' ? 'flex-start' : 'flex-end',
            backgroundColor: tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.line,
          {
            backgroundColor: tintColor,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  line: {
    height: 2,
    marginVertical: 1.5,
    borderRadius: 2,
    width: 18,
  },
});

export default HamburgerIcon;
