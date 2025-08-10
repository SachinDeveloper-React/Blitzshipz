import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppNavigator} from '../navigation';
import Logo from '../assets/logo/Blitzshipz-logo1.svg';
type Props = {};

const SplashScreen = (props: Props) => {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor="#fff"
      />
      {hide ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Logo width={Dimensions.get('window').width * 0.8} />
          </View>
        </>
      ) : (
        <AppNavigator />
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
