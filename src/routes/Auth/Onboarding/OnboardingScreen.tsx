import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {CustomButton, CustomText} from '../../../components';
import {onboardingData} from './helper';
import {styles} from './styles';
import {navigate} from '../../../navigation';

const {width, height} = Dimensions.get('screen');

const OnboardingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      <Animated.FlatList
        data={onboardingData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={[styles.slide, {width}]}>
            <Image
              source={item.image_url}
              style={{
                width: width * 0.9,
                height: undefined,
                aspectRatio: 1,
                borderRadius: 16,
                opacity: 0.97,
              }}
              resizeMode="contain"
            />

            <View style={styles.textContainer}>
              <CustomText variant="title">{item.title}</CustomText>
              <CustomText variant="body">{item.subtitle}</CustomText>
            </View>
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />

      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, {width: dotWidth, opacity}]}
            />
          );
        })}
      </View>

      <View style={{padding: 16}}>
        <CustomButton
          title="Login"
          onPress={() =>
            navigate('Auth', {
              screen: 'Login',
            })
          }
          variant="secondary"
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
