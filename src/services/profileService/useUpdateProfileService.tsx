import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfileApi} from '../../networking';
import useProfileService from './useProfileService';

type UserData = {
  id: string;
  email: string;
  password: string;
  roles?: Role[];
  firstName: string;
  lastName: string;
  mobileNumber: string;
  altMobileNumber: string;
  nameAsPerAadhaar: string | null;
  firmName: string | null;
  websiteUrl: string;
  companyName: string;
  createDate: string;
  modifyDate: string;
  verified: boolean;
  standard: 'SILVER' | 'GOLD' | 'PLATINUM' | string;
  popupVisible: boolean;
  userId: string;
  emailVerified: boolean;
};

type UserField = keyof UserData;

type UserErrors = Partial<Record<UserField, string>>;
type Props = {
  initialData: UserData;
};
type Role = {
  id: string;
  name: 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | string;
};

const useUpdateProfileService = ({initialData}: Props) => {
  const [editUser, setEditUser] = useState<UserData>({
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    altMobileNumber: '',
    nameAsPerAadhaar: null,
    firmName: null,
    websiteUrl: '',
    companyName: '',
    createDate: '',
    modifyDate: '',
    verified: true,
    standard: '',
    popupVisible: true,
    userId: '',
    emailVerified: true,
  });
  const [errors, setErrors] = useState<UserErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const {onRefresh} = useProfileService({initial: false});

  const updateUserField = (field: UserField, value: string | boolean) => {
    setEditUser(prev => ({...prev, [field]: value}));
    setErrors(prev => ({...prev, [field]: ''}));
  };

  const validateUserInfo = (): boolean => {
    const newErrors: UserErrors = {};

    if (!editUser.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!editUser.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!editUser.email.trim() || !/\S+@\S+\.\S+/.test(editUser.email))
      newErrors.email = 'Valid email is required';

    if (!/^\d{10}$/.test(editUser.mobileNumber))
      newErrors.mobileNumber = 'Valid 10-digit mobile number is required';

    if (editUser.altMobileNumber && !/^\d{10}$/.test(editUser.altMobileNumber))
      newErrors.altMobileNumber = 'Alternate mobile number must be 10 digits';

    if (!editUser.companyName.trim())
      newErrors.companyName = 'Company name is required';

    if (editUser.websiteUrl && !/^https?:\/\/.+\..+/.test(editUser.websiteUrl))
      newErrors.websiteUrl = 'Website URL must be valid (http or https)';

    if (!['SILVER', 'GOLD', 'PLATINUM'].includes(editUser.standard))
      newErrors.standard = 'Standard must be SILVER, GOLD or PLATINUM';

    if (!editUser.userId.trim()) newErrors.userId = 'User ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const editProfile = async () => {
    try {
      setLoading(true);

      const {roles, ...body} = editUser;

      const response = await ProfileApi.editProfile(body);

      if (response.code === 200) {
        onRefresh();
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            response.data.message ?? 'User Edit Successfully',
            ToastAndroid.BOTTOM,
          );
        } else {
          Alert.alert(response.data.message ?? 'User Edit Successfully');
        }
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            response.data.message ?? 'Unexpacted Error',
            ToastAndroid.BOTTOM,
          );
        } else {
          Alert.alert(response.data.message ?? 'Unexpacted Error');
        }
      }
    } catch (error: any) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          error.message ?? 'Unexpacted Error',
          ToastAndroid.BOTTOM,
        );
      } else {
        Alert.alert(error.message ?? 'Unexpacted Error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditUser(initialData);
  }, []);

  return {
    updateUserField,
    editUser,
    errors,
    loading,
    validateUserInfo,
    editProfile,
  };
};

export default useUpdateProfileService;

const styles = StyleSheet.create({});
