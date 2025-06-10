// src/components/UserRoleBadge.tsx
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

type Props = {
  role: string;
};

const UserRoleBadge = ({role}: Props) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{role.replace('ROLE_', '')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    color: '#00796b',
    fontWeight: '600',
  },
});

export default UserRoleBadge;
