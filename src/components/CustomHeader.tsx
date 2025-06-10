import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';
import React from 'react';
import {headerHeight, StatusBarHeight} from '../utils';
import CustomIcons from './CustomIcons';
import CustomText from './CustomText';

type Props = {
  title: string;
  onBack?: () => void;
  RightComponent?: React.ReactNode;
};

const CustomHeader = ({title, onBack, RightComponent}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Pressable onPress={onBack} style={styles.side}>
          <CustomIcons
            name={'arrowleft'}
            type={'AntDesign'}
            size={24}
            color={'#000'}
          />
        </Pressable>

        <View style={styles.titleWrapper}>
          <CustomText variant="subtitle">{title}</CustomText>
        </View>

        <View style={styles.side}>{RightComponent}</View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: headerHeight,
    elevation: 4,
    paddingHorizontal: 20,
  },
  inner: {
    marginTop: StatusBarHeight,
    height: headerHeight - StatusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
  },
  side: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    flex: 1,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
