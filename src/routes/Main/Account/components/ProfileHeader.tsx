import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string;
  profile: string;
  verified: boolean;
  loading: boolean;
  onPress?: () => void;
};

const ProfileHeader = ({name, verified, profile, onPress, loading}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar} onPress={onPress}>
        {loading ? (
          <View
            style={[
              styles.avatar,
              {
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <ActivityIndicator size={'small'} />
          </View>
        ) : (
          <Image
            source={{
              uri: profile,
            }}
            style={styles.avatar}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
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
