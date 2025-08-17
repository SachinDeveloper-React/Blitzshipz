import React, {useRef, useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  StyleSheet,
  Animated,
} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {navigation, state} = props;
  const [showCreateOrderOptions, setShowCreateOrderOptions] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowCreateOrderOptions(prev => !prev);
    Animated.timing(rotation, {
      toValue: showCreateOrderOptions ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateZ = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const currentRoute = state.routeNames[state.index];

  const isActive = (screen: string) => currentRoute === screen;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Dashboard"
        icon={({size, color}) => {
          return (
            <Image
              source={require('../../assets/icons/layout.png')}
              style={{width: size, height: size, resizeMode: 'contain'}}
            />
          );
        }}
        focused={isActive('Home')}
        onPress={() => navigation.navigate('Home')}
      />

      <DrawerItem
        label={() => (
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 14, color: 'rgba(28, 28, 30, 0.78)'}}>
              Create Order
            </Text>
            <Animated.View
              style={{marginLeft: 'auto', transform: [{rotate: rotateZ}]}}>
              <MaterialIcons name="keyboard-arrow-up" size={22} color="#555" />
            </Animated.View>
          </View>
        )}
        icon={({size}) => (
          <Image
            source={require('../../assets/icons/createOrder.png')}
            style={{width: size, height: size, resizeMode: 'contain'}}
          />
        )}
        onPress={toggleAccordion}
        focused={isActive('')}
      />

      {/* Accordion Content */}
      {showCreateOrderOptions && (
        <View style={{paddingLeft: 40}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BookmyOrderScreen')}
            style={[
              styles.accordionItem,
              isActive('BookmyOrderScreen') && styles.activeItem,
            ]}>
            <FontAwesome name="caret-right" size={20} color={'#ccc'} />
            <Text
              style={
                isActive('BookmyOrderScreen')
                  ? styles.activeLabel
                  : {
                      fontSize: 14,
                      color: 'rgba(28, 28, 30, 0.78)',
                    }
              }>
              Book My Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrintLabelScreen')}
            style={[
              styles.accordionItem,
              isActive('PrintLabelScreen') && styles.activeItem,
            ]}>
            <FontAwesome name="caret-right" size={20} color={'#ccc'} />
            <Text
              style={
                isActive('PrintLabelScreen')
                  ? styles.activeLabel
                  : {
                      fontSize: 14,
                      color: 'rgba(28, 28, 30, 0.78)',
                    }
              }>
              Print Label
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <DrawerItem
        label="COD"
        icon={({size}) => (
          <Image
            source={require('../../assets/icons/cod.webp')}
            style={{width: size, height: size, resizeMode: 'contain'}}
          />
        )}
        onPress={() => navigation.navigate('CodScreen')}
        focused={isActive('CodScreen')}
      />

      <DrawerItem
        label="Weight Discrepancy"
        icon={({size}) => (
          <Image
            source={require('../../assets/icons/weight.png')}
            style={{width: size, height: size, resizeMode: 'contain'}}
          />
        )}
        onPress={() => navigation.navigate('WeightDiscrepancyScreen')}
        focused={isActive('WeightDiscrepancyScreen')}
      />

      <DrawerItem
        label="Rate Calculator"
        icon={({size}) => (
          <Image
            source={require('../../assets/icons/calculator.png')}
            style={{width: size, height: size, resizeMode: 'contain'}}
          />
        )}
        focused={isActive('RateCalculatorScreen')}
        onPress={() => navigation.navigate('RateCalculatorScreen')}
      />

      <DrawerItem
        label="FAQ"
        icon={({size}) => (
          <Image
            source={require('../../assets/icons/faq.png')}
            style={{width: size, height: size, resizeMode: 'contain'}}
          />
        )}
        focused={isActive('FaqScreen')}
        onPress={() => navigation.navigate('FaqScreen')}
      />

      <DrawerItem
        label="Support"
        icon={({size}) => (
          <Image
            source={require('../../assets/icons/support.png')}
            style={{width: size, height: size, resizeMode: 'contain'}}
          />
        )}
        focused={isActive('SupportScreen')}
        onPress={() => navigation.navigate('SupportScreen')}
      />

      <DrawerItem
        label="Settings"
        icon={({size}) => (
          <Image
            source={require('../../assets/icons/settings.png')}
            style={{width: size, height: size, resizeMode: 'contain'}}
          />
        )}
        focused={isActive('Setting')}
        onPress={() => navigation.navigate('Setting')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  accordionLabel: {
    fontSize: 16,
    marginLeft: 14,
    fontWeight: '400',
    color: 'rgba(28, 28, 30, 0.68)',
  },
  accordionContent: {
    paddingLeft: 56,
    paddingBottom: 8,
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  activeItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  activeLabel: {
    fontWeight: 'bold',
    color: '#1e90ff',
  },
});

export default CustomDrawerContent;
