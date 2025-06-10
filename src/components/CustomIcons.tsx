import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
type Props = {
  name: string;
  type:
    | 'Ionicons'
    | 'AntDesign'
    | 'Fontisto'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'SimpleLineIcons'
    | 'Entypo'
    | 'FontAwesome'
    | 'Feather';

  size: number;
  color: string;
};

const CustomIcons = ({
  color = '#fff',
  size = 16,
  type = 'MaterialIcons',
  name = 'error',
  ...props
}: Props) => {
  const getIcons = (type: Props['type']) => {
    switch (type) {
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={color} {...props} />;
      case 'AntDesign':
        return <AntDesign name={name} size={size} color={color} />;
      case 'Fontisto':
        return <Fontisto name={name} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={name} size={size} color={color} />;
      case 'SimpleLineIcons':
        return <SimpleLineIcons name={name} size={size} color={color} />;
      case 'Entypo':
        return <Entypo name={name} size={size} color={color} />;
      case 'FontAwesome':
        return <FontAwesome name={name} size={size} color={color} />;
      case 'Feather':
        return <Feather name={name} size={size} color={color} />;
      default:
        return null;
    }
  };

  return <View>{getIcons(type)}</View>;
};

export default CustomIcons;

const styles = StyleSheet.create({});
