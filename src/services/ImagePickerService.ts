import {Alert, Platform} from 'react-native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

type ImagePickerResult = Asset | null;

const defaultOptions: ImageLibraryOptions & CameraOptions = {
  mediaType: 'photo',
  includeBase64: false,
  quality: 0.8,
  selectionLimit: 1,
  saveToPhotos: true,
};

const isValidImage = (asset: Asset): boolean => {
  return asset?.type ? allowedMimeTypes.includes(asset.type) : false;
};

const handleResponse = (
  response: any,
  callback: (image: ImagePickerResult) => void,
) => {
  if (response.didCancel) return;
  if (response.errorCode) {
    Alert.alert('Error', response.errorMessage || 'Something went wrong');
    return;
  }
  const asset = response.assets?.[0];
  if (asset && isValidImage(asset)) {
    callback(asset);
  } else {
    Alert.alert('Invalid File', 'Only JPG or PNG images are allowed.');
    callback(null);
  }
};

const ImagePickerService = {
  pickFromCamera: (callback: (image: ImagePickerResult) => void) => {
    launchCamera(defaultOptions, response =>
      handleResponse(response, callback),
    );
  },

  pickFromGallery: (callback: (image: ImagePickerResult) => void) => {
    launchImageLibrary(defaultOptions, response =>
      handleResponse(response, callback),
    );
  },

  pickImageWithPrompt: (callback: (image: ImagePickerResult) => void) => {
    Alert.alert('Select Image', 'Choose a source', [
      {
        text: 'Camera',
        onPress: () => ImagePickerService.pickFromCamera(callback),
      },
      {
        text: 'Gallery',
        onPress: () => ImagePickerService.pickFromGallery(callback),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  },
};

export default ImagePickerService;
