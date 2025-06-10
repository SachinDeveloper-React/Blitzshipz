import {
  Alert,
  GestureResponderEvent,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomButton,
  CustomIcons,
  CustomText,
  CustomTextInput,
} from '../../../components';
import {styles} from './styles';

type Props = {};

const ShipmentTrackingScreen = (props: Props) => {
  const [phone, setPhone] = useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.container}>
                <View
                  style={[styles.header, {justifyContent: 'space-between'}]}>
                  <View style={styles.header}>
                    <CustomIcons
                      type="MaterialCommunityIcons"
                      color="pink"
                      name="emoticon-cry-outline"
                      size={32}
                    />
                    <View>
                      <CustomText variant="title">Blitzship</CustomText>
                      <CustomText variant="caption">
                        Making Shipping Delightfull
                      </CustomText>
                    </View>
                  </View>
                  <Pressable>
                    <CustomText variant="body" style={{color: 'blue'}}>
                      Sign-Up
                    </CustomText>
                  </Pressable>
                </View>

                <View style={styles.card}>
                  <View style={styles.gapcolumn}>
                    <CustomText variant="subtitle">
                      Track Your Shipment
                    </CustomText>
                    <CustomText variant="caption">
                      Get instant access to all your Orders at one place. We
                      track all your orders in real-time
                    </CustomText>
                    <View style={styles.gapcolumn}>
                      <CustomTextInput
                        label="Phone Number"
                        countryCode="+91"
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.textInput}
                        keyboardType="numeric"
                        inputMode="numeric"
                        placeholder="Enter your 10-digit mobile number"
                        maxLength={10}
                        rightIcon={
                          phone ? (
                            <CustomIcons
                              type="Ionicons"
                              name="close-circle"
                              size={20}
                              color="gray"
                            />
                          ) : null
                        }
                        onRightIconPress={() => setPhone('')}
                      />
                      <CustomText variant="caption">
                        Click "verify OTP" to signup with Blitzship while
                        accepting our{' '}
                        <CustomText
                          variant="caption"
                          style={{fontWeight: '600', color: 'blue'}}>
                          Terms & Conditions
                        </CustomText>
                      </CustomText>
                      <CustomButton
                        variant="primary"
                        title="Send OTP"
                        disabled={phone.length !== 10}
                        onPress={function (event: GestureResponderEvent): void {
                          console.log('Continue pressed');
                        }}
                      />
                    </View>
                    <CustomText variant="caption">
                      You will be redirected to myBlitzShip to track all your
                      orders.
                    </CustomText>
                  </View>
                </View>

                <View style={styles.boxContainer}>
                  <Image
                    source={{
                      uri: 'https://cdn4.iconfinder.com/data/icons/summer-vacations-stickers/68/14-128.png',
                    }}
                    style={styles.image}
                  />

                  <View style={styles.textContainer}>
                    <CustomText variant="caption" style={styles.text}>
                      Worried if eCommerce shipping will burn a hole in your
                      budget?
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <CustomText
                        onPress={() => Alert.alert('Shipment')}
                        variant="caption"
                        style={[
                          styles.text,
                          {
                            fontWeight: '700',
                          },
                        ]}>
                        Check Shipment Rates
                      </CustomText>
                      <CustomIcons
                        name="arrowright"
                        type="AntDesign"
                        size={16}
                        color="#fff"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.productIssueBoxContainer}>
                  <CustomButton
                    size="small"
                    title="Write to Us"
                    variant="outline"
                    onPress={() => true}
                  />

                  <View style={styles.textContainer}>
                    <CustomText
                      variant="body"
                      style={[
                        styles.productIssueText,
                        {
                          fontWeight: '500',
                        },
                      ]}>
                      Facing Issue with the product ?
                    </CustomText>

                    <CustomText
                      variant="caption"
                      style={[styles.productIssueText]}>
                      Help us understand the issue you are facing with the
                      product
                    </CustomText>
                  </View>

                  <View
                    style={{
                      width: 10,
                      backgroundColor: 'red',
                      height: '100%',
                      borderRadius: 16,
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ShipmentTrackingScreen;
