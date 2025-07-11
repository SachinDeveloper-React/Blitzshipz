import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CustomIcons} from '../../components';
import {useAuthService} from '../../services';
import {navigate} from '../../navigation';

type SettingItem = {
  id: number;
  name: string;
  img: string;
  navigate: string;
};

const SettingScreen = () => {
  const {logout} = useAuthService();
  const list: SettingItem[] = [
    {
      id: 1,
      name: 'Change Password',
      img: require('../../assets/icons/userInfo.png'),
      navigate: 'ChangePasswordScreen',
    },
  ];

  const SCREENS = {
    ChangePasswordScreen: 'ChangePasswordScreen',
  } as const;

  type ScreenName = keyof typeof SCREENS;

  const isValidScreen = (value: string): value is ScreenName => {
    return value in SCREENS;
  };

  const navigateToScreen = (screen: string) => {
    if (isValidScreen(screen)) {
      navigate(SCREENS[screen]);
    } else {
      console.warn(`Invalid screen name: ${screen}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <FlatList
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigateToScreen(item.navigate)}>
            <Image source={item.img as any} style={styles.icon} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={[
              styles.item,
              {
                marginTop: 14,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                gap: 10,
              },
            ]}
            onPress={logout}>
            <CustomIcons type="Entypo" name="log-out" color="red" size={20} />
            <Text
              style={[
                styles.text,
                {
                  color: 'red',
                },
              ]}>
              Log out
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 14,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  separator: {
    height: 12,
  },
});
