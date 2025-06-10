import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  CustomButton,
  CustomIcons,
  CustomTextInput,
} from '../../../../components';
import {categories} from './helper';
import {useSettingService} from '../../../../services';

type Props = {
  visible: boolean;
  awb?: string;
  onClose: () => void;
};

const RaisedTicketModal = ({visible, onClose, awb}: Props) => {
  const {onRefresh, handleInputs, onSubmit, raisedTicket, resetInputs} =
    useSettingService({
      initial: false,
    });

  useEffect(() => {
    if (!awb) return;
    handleInputs('awbNumber', String(awb));
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            resetInputs();
            onClose();
          }}
        />
        <View style={styles.modalContent}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <Text style={{marginBottom: 10, fontSize: 16, fontWeight: 600}}>
                Categories
              </Text>
              <ScrollView
                horizontal
                style={styles.tabContainer}
                showsHorizontalScrollIndicator={false}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.tabButton,
                      raisedTicket.category.id === cat.id && styles.activeTab,
                    ]}
                    onPress={() => {
                      handleInputs('category', cat);
                      // setSubCategory('');
                    }}>
                    <Text
                      style={[
                        styles.tabText,
                        raisedTicket.category.id === cat.id &&
                          styles.activeTabText,
                      ]}>
                      {cat.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={{fontSize: 16, fontWeight: 600}}>
                Sub Categories
              </Text>

              <FlatList
                scrollEnabled={false}
                data={raisedTicket.category.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <Pressable
                    style={[styles.listItem]}
                    onPress={() => handleInputs('subCategory', item)}>
                    <Text
                      style={[
                        styles.listText,
                        {
                          color:
                            raisedTicket.subCategory === item
                              ? 'green'
                              : '#34495e',
                        },
                      ]}>
                      • {item}
                    </Text>
                    <CustomIcons
                      name={'checkmark-circle-sharp'}
                      type={'Ionicons'}
                      size={16}
                      color={
                        raisedTicket.subCategory === item
                          ? 'green'
                          : 'transparent'
                      }
                    />
                  </Pressable>
                )}
                contentContainerStyle={{paddingVertical: 10}}
              />

              <View
                style={{flexDirection: 'column', gap: 20, marginVertical: 10}}>
                <CustomTextInput
                  label="AWB No."
                  keyboardType="number-pad"
                  onChangeText={text => handleInputs('awbNumber', text)}
                  defaultValue={String(raisedTicket.awbNumber)}
                  value={String(raisedTicket.awbNumber)}
                  disabled={awb ? true : false}
                  editable={awb ? false : true}
                  leftIcon={
                    <CustomIcons
                      name="roman-numeral-9"
                      type="MaterialCommunityIcons"
                      size={26}
                      color="#000"
                    />
                  }
                />
                <CustomTextInput
                  label="Message"
                  keyboardType="default"
                  onChangeText={text => handleInputs('description', text)}
                  value={raisedTicket.description}
                  leftIcon={
                    <CustomIcons
                      name="message"
                      type="Entypo"
                      size={26}
                      color="#000"
                    />
                  }
                />
              </View>
              <CustomButton
                title={'Submit'}
                loading={raisedTicket.loadingTicket}
                disabled={
                  raisedTicket.loadingTicket ||
                  !raisedTicket.category ||
                  !raisedTicket.subCategory ||
                  !raisedTicket.awbNumber ||
                  !raisedTicket.description
                }
                onPress={() => {
                  onSubmit();
                  onClose();
                }}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default RaisedTicketModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    // paddingBottom: 30,
    maxHeight: '90%',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bdc3c7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 14,
    color: '#34495e',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
});
