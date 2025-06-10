import {View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DashboardScreen, ProfileScreen, TrackOrderScreen} from '../../routes';
import {HamburgerIcon} from '../../components';
import {DrawerActions} from '@react-navigation/native';
type Props = {};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({color, size}) => {
          let iconName: string = 'Dashboard';
          if (route.name === 'Dashboard') iconName = 'home';
          if (route.name === 'TrackOrderScreen') iconName = 'search';
          if (route.name === 'Upload') iconName = 'cloud-upload-outline';
          if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Dashboard',
          tabBarLabel: 'Dashboard',
          headerTitleAllowFontScaling: true,
          headerTitleAlign: 'left',
          tabBarActiveTintColor: '#0a3a5f',
          headerLeft: ({tintColor}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <HamburgerIcon
                  tintColor="#0a3a5f"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            );
          },
        })}
      />

      <Tab.Screen
        name="TrackOrderScreen"
        options={({navigation, route}) => ({
          tabBarLabel: 'Track Order',
          headerTitleAllowFontScaling: true,
          headerTitle: 'Track Order',
          headerTitleAlign: 'left',
          tabBarActiveTintColor: '#0a3a5f',
          headerLeft: ({tintColor}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <HamburgerIcon
                  tintColor="#0a3a5f"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            );
          },
        })}
        component={TrackOrderScreen}
      />
      <Tab.Screen
        name="Profile"
        options={({navigation, route}) => ({
          tabBarLabel: 'Account',
          headerTitleAllowFontScaling: true,
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          tabBarActiveTintColor: '#0a3a5f',
          headerLeft: ({tintColor}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <HamburgerIcon
                  tintColor="#0a3a5f"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            );
          },
          headerRight: ({tintColor}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <HamburgerIcon
                  tintColor="#0a3a5f"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            );
          },
        })}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
