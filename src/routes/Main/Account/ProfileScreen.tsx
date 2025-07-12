import React, {useLayoutEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import {
  AddressCardList,
  ProfileHeader,
  ProfileInfoCard,
  UserRoleBadge,
} from './components';
import {BottomTabParamList, navigate} from '../../../navigation';
import {CustomIcons, CustomText, HamburgerIcon} from '../../../components';
import {useProfileService} from '../../../services';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {openGalleryImage} from '../../../utils';

type ProfileScreenProps = BottomTabScreenProps<BottomTabParamList, 'Profile'>;
const ProfileScreen = ({navigation, route}: ProfileScreenProps) => {
  const {
    userProfileData,
    addressData,
    loading,
    error,
    onRefresh,
    deleteWarehouse,
    userProfileDoc,
    uploadProfileImage,
  } = useProfileService({initial: true});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HamburgerIcon
            align="right"
            tintColor="#0a3a5f"
            onPress={() => navigate('ProfileOtherDetailsScreen')}
          />
        );
      },
    });
  }, [navigation]);

  if (loading.userProfile) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleEdit = (id: string) => {
    console.log('Edit ID:', id);
  };
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
            deleteWarehouse(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleImage = async () => {
    const result = await openGalleryImage();
    if (result) {
      console.log('result', result);
      const uri = result.uri;
      if (uri) {
        uploadProfileImage(result);
      }
    }
  };
  if (error.userProfileError || error.userWarehouses) {
    return (
      <CustomText>{error.userProfileError || error.userWarehouses}</CustomText>
    );
  }

  console.log('userProfileDoc', userProfileDoc);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading.refreshUserProfile}
          onRefresh={onRefresh}
        />
      }>
      <View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CustomText variant="title">User Information</CustomText>
          <Pressable
            onPress={() =>
              navigate('EditProfileScreen', {
                userData: userProfileData,
              })
            }
            style={{
              paddingHorizontal: 15,
            }}>
            <CustomIcons type="AntDesign" size={22} color="#000" name="edit" />
          </Pressable>
        </View>
        <View style={styles.divider} />

        <ProfileHeader
          name={`${userProfileData?.firstName} ${userProfileData?.lastName}`}
          verified={Boolean(userProfileData?.verified)}
          profile={
            userProfileDoc
              ? {
                  uri: `data:image/png;base64,${userProfileDoc?.image[0]?.data?.data}`,
                }
              : require('../../../assets/dummy-dp.jpg')
          }
          onPress={handleImage}
          loading={loading.profileImage}
        />
        <ProfileInfoCard label="User ID" value={userProfileData?.userId} />
        <ProfileInfoCard label="Email" value={userProfileData?.email} />
        <ProfileInfoCard label="Mobile" value={userProfileData?.mobileNumber} />
        <ProfileInfoCard
          label="Alt Mobile"
          value={userProfileData?.altMobileNumber}
        />
        <ProfileInfoCard label="Company" value={userProfileData?.companyName} />
        <ProfileInfoCard label="Standard" value={userProfileData?.standard} />
        <ProfileInfoCard
          label="Website"
          value={userProfileData?.websiteUrl || 'N/A'}
        />
        <Text style={styles.sectionTitle}>Roles</Text>
        <View style={styles.roleContainer}>
          {userProfileData?.roles.map(role => (
            <UserRoleBadge key={role.id} role={role.name} />
          ))}
        </View>
      </View>

      {error.userWarehouses ? (
        <></>
      ) : (
        <AddressCardList
          addresses={addressData}
          onEdit={handleEdit}
          deleteWarehouseHandler={id => handleDelete(id)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionTitles: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 12,
  },
});

export default ProfileScreen;
