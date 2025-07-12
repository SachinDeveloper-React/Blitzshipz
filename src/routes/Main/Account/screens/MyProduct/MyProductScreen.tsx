import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useProfileMyProductService} from '../../../../../services';
import {ProductCard} from './components';
import {StackScreenProps} from '@react-navigation/stack';
import {navigate, RootStackParamList} from '../../../../../navigation';
import {CustomIcons} from '../../../../../components';
import {NotFound} from '../../../../../layout';

const MyProductScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'MyProductScreen'>) => {
  const {
    loading,
    error,
    myProduct,
    refreshLoading,
    onRefresh,
    fetchData,
    deleteProduct,
  } = useProfileMyProductService();

  useLayoutEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            onPress={() =>
              navigate('ProductFormScreen', {
                type: 'add',
              })
            }>
            <CustomIcons type="AntDesign" size={22} color="#000" name="plus" />
          </Pressable>
        );
      },
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this warehouse?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteProduct(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={myProduct}
          renderItem={({index, item}) => {
            return (
              <ProductCard
                product={item}
                onPress={() => true}
                onEdit={() => {
                  navigate('ProductFormScreen', {
                    type: 'edit',
                    defaultData: item,
                  });
                }}
                onDelete={() => handleDelete(item.id)}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
          }
          keyExtractor={(_, i) => i.toString()}
          initialNumToRender={10}
          updateCellsBatchingPeriod={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          ListEmptyComponent={() => <NotFound title="No Data Found" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyProductScreen;

const styles = StyleSheet.create({});
