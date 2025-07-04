import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

// ✅ Camera permission request
const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'This app needs access to your camera to take photos or record videos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission Error:', err);
      return false;
    }
  }
  return true;
};

// ✅ Open camera for photo
export const openCamera = async (): Promise<Asset | null> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    Alert.alert(
      'Permission Denied',
      'Camera access is required to take a photo.',
    );
    return null;
  }

  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    quality: 0.5,
    saveToPhotos: true,
  };

  const result = await launchCamera(options);

  if (result.didCancel) return null;

  if (result.assets && result.assets.length > 0) {
    return result.assets[0];
  } else if (result.errorCode) {
    Alert.alert('Error', result.errorMessage || 'Failed to capture image');
  }

  return null;
};

// ✅ Open camera for video
export const openVideoCamera = async (): Promise<string | null> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    Alert.alert(
      'Permission Denied',
      'Camera access is required to record a video.',
    );
    return null;
  }

  const options: CameraOptions = {
    mediaType: 'video',
    videoQuality: 'high',
    durationLimit: 60,
    saveToPhotos: true,
    cameraType: 'back',
    formatAsMp4: true,
  };

  const result = await launchCamera(options);

  if (result.didCancel) return null;

  if (result.assets && result.assets.length > 0) {
    const videoUri = result.assets[0].uri;
    return videoUri ?? null;
  } else if (result.errorCode) {
    Alert.alert('Error', result.errorMessage || 'Failed to record video');
  }

  return null;
};

// ✅ Pick photo from gallery
export const openGalleryImage = async (): Promise<Asset | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 0.8,
  };

  const result = await launchImageLibrary(options);

  if (result.didCancel) return null;

  if (result.assets && result.assets.length > 0) {
    return result.assets[0];
  } else if (result.errorCode) {
    Alert.alert('Error', result.errorMessage || 'Failed to select image');
  }

  return null;
};

// ✅ Pick video from gallery
export const openGalleryVideo = async (): Promise<string | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'video',
    selectionLimit: 1,
  };

  const result = await launchImageLibrary(options);

  if (result.didCancel) return null;

  if (result.assets && result.assets.length > 0) {
    const videoUri = result.assets[0].uri;
    return videoUri ?? null;
  } else if (result.errorCode) {
    Alert.alert('Error', result.errorMessage || 'Failed to select video');
  }

  return null;
};
