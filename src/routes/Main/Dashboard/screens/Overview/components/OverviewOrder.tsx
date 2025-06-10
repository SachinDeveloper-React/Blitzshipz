import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type OverviewOrderProps = {
  title: string;
  count: string | number;
  icon: string;
  color: string;
};

const OverviewOrder: React.FC<OverviewOrderProps> = ({
  title,
  count,
  icon,
  color,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name={icon} size={16} color={color} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '48%',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: '#333',
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default memo(OverviewOrder);
