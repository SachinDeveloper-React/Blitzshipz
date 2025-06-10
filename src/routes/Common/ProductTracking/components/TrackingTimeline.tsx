import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TrackingItem} from '../../../../types';

type Props = {
  data: TrackingItem[];
};

const TrackingTimeline: React.FC<Props> = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
      renderItem={({item, index}) => (
        <View style={styles.itemContainer}>
          <View style={styles.leftColumn}>
            <View style={styles.iconWrapper}>
              <Icon name="radio-button-checked" size={20} color="#4CAF50" />
              {index !== data.length - 1 && (
                <View style={styles.verticalLine} />
              )}
            </View>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.location}>{item.statusLocation}</Text>
            <Text style={styles.date}>
              {new Date(item.statusDateTime).toLocaleString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
            {item.instructions ? (
              <Text style={styles.instructions}>{item.instructions}</Text>
            ) : null}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  leftColumn: {
    width: 30,
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
  },
  verticalLine: {
    width: 2,
    height: 50,
    backgroundColor: '#ccc',
    marginTop: 4,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 12,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  location: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  instructions: {
    marginTop: 4,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#444',
  },
});

export default TrackingTimeline;
