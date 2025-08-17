import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

interface CustomDrawerItemProps {
  label: string;
  icon: any;
  focused?: boolean;
  onPress: () => void;
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
  label,
  icon,
  focused,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, focused && styles.activeItem]}>
      <Image source={icon} style={styles.icon} />
      <Text style={[styles.label, focused && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    marginLeft: 14,
    fontWeight: '400',
    color: 'rgba(28, 28, 30, 0.68)',
  },
  activeItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
  },
  activeLabel: {
    fontWeight: 'bold',
    color: '#1e90ff',
  },
});

export default CustomDrawerItem;
