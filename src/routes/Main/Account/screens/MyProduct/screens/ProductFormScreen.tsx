import {useHeaderHeight} from '@react-navigation/elements';
import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {CustomButton} from '../../../../../../components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../../navigation';
import {Picker} from '@react-native-picker/picker';
import {useProfileMyProductService} from '../../../../../../services';

type FormState = {
  productName: string;
  category: string;
  price: string;
  tax: string;
  productCode: string;
  actualWeight: string;
  length: string;
  breadth: string;
  height: string;
  categoryID: string;
  id?: string;
};

const ProductFormScreen = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'ProductFormScreen'>) => {
  const {categories, fetchCategory, addProduct, editProduct} =
    useProfileMyProductService();

  const {type, defaultData} = route.params;
  const headerHeight = useHeaderHeight();
  const [form, setForm] = useState<FormState>({
    productName: '',
    categoryID: '',
    category: '',
    price: '',
    tax: '',
    productCode: '',
    actualWeight: '',
    length: '',
    breadth: '',
    height: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [volumetricWeight, setVolumetricWeight] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    const parsedPrice = parseFloat(form.price) || 0;
    const parsedTax = parseFloat(form.tax) || 0;
    setTotalPrice(parsedPrice + parsedTax);
  }, [form.price, form.tax]);

  useEffect(() => {
    const l = parseFloat(form.length) || 0;
    const b = parseFloat(form.breadth) || 0;
    const h = parseFloat(form.height) || 0;
    const volWeight = (l * b * h) / 5000;
    setVolumetricWeight(volWeight);
  }, [form.length, form.breadth, form.height]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: type === 'add' ? 'Add New Product' : 'Edit Product',
    });
  }, [navigation]);

  useEffect(() => {
    if (defaultData) {
      setForm(prev => ({
        ...prev,
        actualWeight: String(defaultData.weight ?? ''),
        breadth: String(defaultData?.b ?? ''),
        length: String(defaultData?.l ?? ''),
        height: String(defaultData?.h ?? ''),
        category: defaultData.categoryName ?? '',
        price: String(defaultData.totalPrice ?? ''),
        productCode: defaultData.productCode ?? '',
        productName: defaultData.productName ?? '',
        tax: String(defaultData.tax ?? ''),
      }));
    }
  }, [defaultData]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardStatus ? headerHeight : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}>
            <View style={styles.field}>
              <Text style={styles.label}>Product Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter product name"
                value={form.productName}
                onChangeText={text => handleChange('productName', text)}
                placeholderTextColor="#ccc"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Category</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}>
                <Picker
                  selectedValue={form.category}
                  onValueChange={(itemValue, itemIndex) => {
                    handleChange('category', itemValue);
                  }}
                  style={{
                    fontSize: 14,
                    color: '#000',
                  }}
                  itemStyle={{
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {categories.map((item, i) => {
                    return (
                      <Picker.Item
                        key={i}
                        label={item.categoryName}
                        value={
                          item.categoryName === 'Men-Clothings'
                            ? 'MEN CLOTHING'
                            : item.categoryName
                        }
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Product Price</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={form.price}
                onChangeText={text => handleChange('price', text)}
                placeholderTextColor="#ccc"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Tax</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={form.tax}
                onChangeText={text => handleChange('tax', text)}
                placeholderTextColor="#ccc"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Total Price</Text>
              <Text style={styles.total}>{totalPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Product Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter product code"
                value={form.productCode}
                onChangeText={text => handleChange('productCode', text)}
                placeholderTextColor="#ccc"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Actual Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={form.actualWeight}
                onChangeText={text => handleChange('actualWeight', text)}
                placeholderTextColor="#ccc"
              />
            </View>

            <Text style={styles.subHeading}>Dimensions (cm)</Text>
            <View style={styles.dimensionRow}>
              <TextInput
                style={styles.inputDim}
                placeholder="L"
                keyboardType="numeric"
                value={form.length}
                onChangeText={text => handleChange('length', text)}
                placeholderTextColor="#ccc"
              />
              <Text style={styles.multiply}>×</Text>
              <TextInput
                style={styles.inputDim}
                placeholder="B"
                keyboardType="numeric"
                value={form.breadth}
                onChangeText={text => handleChange('breadth', text)}
                placeholderTextColor="#ccc"
              />
              <Text style={styles.multiply}>×</Text>
              <TextInput
                style={styles.inputDim}
                placeholder="H"
                keyboardType="numeric"
                value={form.height}
                onChangeText={text => handleChange('height', text)}
                placeholderTextColor="#ccc"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Volumetric Weight (kg)</Text>
              <Text style={styles.total}>{volumetricWeight.toFixed(2)}</Text>
            </View>

            <CustomButton
              title={type === 'add' ? 'Create Product' : 'Edit Product'}
              onPress={() => {
                if (type === 'add') {
                  const ID =
                    categories.find(item => item.categoryName === form.category)
                      ?.id ?? '';
                  addProduct({
                    categoryId: ID,
                    categoryName: form.category,
                    productPrice: form.price,
                    productName: form.productName,
                    weight: form.actualWeight,
                    tax: form.tax,
                    l: form.length,
                    b: form.breadth,
                    h: form.height,
                    volume: volumetricWeight,
                    productCode: form.productCode,
                  });
                } else {
                  const ID =
                    categories.find(item => item.categoryName === form.category)
                      ?.id ?? '';
                  editProduct(defaultData?.id ?? '', {
                    categoryId: ID,
                    categoryName: form.category,
                    productPrice: form.price,
                    productName: form.productName,
                    weight: form.actualWeight,
                    tax: form.tax,
                    l: form.length,
                    b: form.breadth,
                    h: form.height,
                    volume: volumetricWeight,
                    productCode: form.productCode,
                  });
                }
              }}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProductFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  dimensionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  inputDim: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  multiply: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 4,
  },
});
