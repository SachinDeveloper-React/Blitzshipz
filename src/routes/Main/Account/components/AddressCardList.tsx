import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomIcons, CustomText} from '../../../../components';
import {navigate} from '../../../../navigation';

type Address = {
  id: string;
  userId: string;
  name: string;
  address: string;
  pin: string;
  phone: string;
  altPhone: string;
  returnSame: boolean;
  city: string;
  state: string;
  email: string;
  primary: boolean;
  returnName: string | null;
  returnEmail: string | null;
  returnPhone: string | null;
  returnAltPhone: string | null;
  returnAddress: string;
  returnCity: string;
  returnState: string;
  returnPin: string;
};

type Props = {
  addresses: Address[];
  onEdit: (addressId: string) => void;
  deleteWarehouseHandler: (id: string) => void;
};

const AddressCardList: React.FC<Props> = ({
  addresses,
  onEdit,
  deleteWarehouseHandler,
}) => {
  return (
    <>
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText variant="title">Pickup Information</CustomText>
        <TouchableOpacity
          onPress={() =>
            navigate('WarehouseScreen', {
              type: 'add',
            })
          }>
          <CustomIcons type="AntDesign" size={22} color="#000" name="plus" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <View style={[styles.card, item.primary && styles.primaryCard]}>
            <View style={styles.header}>
              <Text style={styles.title}>{item.name}</Text>
              <View
                style={[
                  styles.header,
                  {
                    gap: 20,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() =>
                    navigate('WarehouseScreen', {
                      type: 'edit',
                      defaultData: item,
                    })
                  }>
                  <CustomIcons
                    name="edit"
                    type="AntDesign"
                    size={26}
                    color="#000"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteWarehouseHandler(item.id)}>
                  <CustomIcons
                    name="trash-outline"
                    type="Ionicons"
                    size={26}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {item.address}, {item.city}, {item.state} - {item.pin}
            </Text>

            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>
              {item.phone}
              {item.altPhone ? ` / ${item.altPhone}` : ''}
            </Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{item.email}</Text>

            {!item.returnSame && (
              <>
                <Text style={styles.label}>Return Address:</Text>
                <Text style={styles.value}>
                  {item.returnAddress}, {item.returnCity}, {item.returnState} -{' '}
                  {item.returnPin}
                </Text>

                <Text style={styles.value}>
                  {item.returnPhone}
                  {item.returnAltPhone ? ` / ${item.returnAltPhone}` : ''}
                </Text>
              </>
            )}
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryCard: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editIcon: {
    fontSize: 18,
  },
  label: {
    fontWeight: '600',
    marginTop: 8,
  },
  value: {
    color: '#333',
  },
});

export default AddressCardList;
