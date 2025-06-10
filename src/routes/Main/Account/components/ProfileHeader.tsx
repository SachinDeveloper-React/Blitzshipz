import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string;
  verified: boolean;
};

const ProfileHeader = ({name, verified}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={{
            uri: 'https://www.app.Blitzships.com/images/dummy-dp.jpg',
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.nameContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>
          {verified && (
            <Icon name="checkmark-circle" size={20} color="#4CAF50" />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ddd',
  },
  nameContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
});

export default ProfileHeader;
