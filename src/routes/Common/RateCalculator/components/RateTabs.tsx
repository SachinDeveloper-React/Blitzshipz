import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

type Props = {
  calculator: React.ReactNode;
  rateCard: React.ReactNode;
};

const RateTabs = ({calculator, rateCard}: Props) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'ratecard'>(
    'calculator',
  );

  const translateX = useRef(new Animated.Value(0)).current;
  const fadeAnimCalc = useRef(new Animated.Value(1)).current;
  const fadeAnimCard = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab: 'calculator' | 'ratecard') => {
    if (tab === activeTab) return;

    setActiveTab(tab);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: tab === 'calculator' ? 0 : width / 2,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnimCalc, {
        toValue: tab === 'calculator' ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimCard, {
        toValue: tab === 'ratecard' ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.tabContainer]}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('calculator')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'calculator' && styles.activeTabText,
            ]}>
            Calculator
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('ratecard')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'ratecard' && styles.activeTabText,
            ]}>
            Rate Card
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.indicator,
          {transform: [{translateX}], width: width / 2},
        ]}
      />

      <View style={styles.contentWrapper}>
        <Animated.View
          style={[styles.content, {opacity: fadeAnimCalc}]}
          pointerEvents={activeTab === 'calculator' ? 'auto' : 'none'}>
          {calculator}
        </Animated.View>

        <Animated.View
          style={[styles.content, {opacity: fadeAnimCard}]}
          pointerEvents={activeTab === 'ratecard' ? 'auto' : 'none'}>
          {rateCard}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  activeTabText: {
    color: '#007bff',
  },
  indicator: {
    height: 3,
    backgroundColor: '#007bff',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    // paddingVertical: 16,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RateTabs;
