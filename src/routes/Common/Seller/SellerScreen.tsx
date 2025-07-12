import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useHeaderHeight} from '@react-navigation/elements';
import {CustomButton} from '../../../components';
import {RootStackParamList} from '../../../navigation';
import {useCreateOrderService} from '../../../services';
import {sellerSchema} from '../../../validations';

const SellerScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SellerScreen'>) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
  });
  const headerHeight = useHeaderHeight();
  const [errors, setErrors] = useState<{name?: string; address?: string}>({});
  const {sellerLoading, sellerError, handleCreateSeller} =
    useCreateOrderService();

  const handleSubmit = () => {
    const {error} = sellerSchema.validate(form, {abortEarly: false});

    if (error) {
      const newErrors: {[key: string]: string} = {};
      error.details.forEach(detail => {
        const field = detail.path[0] as string;
        newErrors[field] = detail.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleCreateSeller(form);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={headerHeight}
          enableOnAndroid={true}>
          <View>
            <Text style={styles.label}>Seller Name</Text>
            <TextInput
              placeholder="Enter Seller Name"
              keyboardType="default"
              inputMode="text"
              keyboardAppearance="default"
              style={styles.input}
              placeholderTextColor="#ccc"
              value={form.name}
              onChangeText={text => setForm({...form, name: text})}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Seller Address</Text>
            <TextInput
              placeholder="Enter seller address"
              keyboardType="default"
              inputMode="text"
              keyboardAppearance="default"
              style={styles.input}
              placeholderTextColor="#ccc"
              value={form.address}
              onChangeText={text => setForm({...form, address: text})}
            />
            {errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}
          </View>
          <CustomButton
            title="Submit"
            onPress={handleSubmit}
            loading={sellerLoading}
            disabled={sellerLoading}
          />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SellerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    padding: 20,
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'darkslategray',
  },
  input: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});
