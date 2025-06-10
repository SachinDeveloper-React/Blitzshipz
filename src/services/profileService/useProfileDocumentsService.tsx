import React, {useState} from 'react';
import {DocumentApi, ProfileApi} from '../../networking';
import {showToast} from '../../utils';
import ImagePickerService from '../ImagePickerService';
import {Asset} from 'react-native-image-picker';
import {useAuthStore} from '../../store';
import {goBack} from '../../navigation';
import {Alert} from 'react-native';

const useProfileDocumentsService = () => {
  const {user} = useAuthStore();
  const [documents, setDocuments] = useState<
    Array<{
      documentDetails: string;
      documentName: string;
      documentNumber: string;
      id: string;
      image: Array<{
        fileName: string;
        data: any;
      }>;
      status: string;
      userId: string;
      verify: boolean;
    }>
  >([]);
  const [imageData, setImageData] = useState<
    Partial<{
      panCard: Asset;
      gstCard: Asset;
    }>
  >();

  const [documentDetails, setDocumentDetails] = useState({
    name: '',
    panNumber: '',
    firmName: '',
    gstin: '',
    panCardURI: '',
    gstCardURI: '',
  });

  const [loading, setLoading] = useState({
    initial: true,
    panLoading: false,
    gstLoading: false,
    refreshLoading: false,
  });

  const getDocumentDetails = async (refresh?: boolean) => {
    try {
      if (refresh) setLoading(prev => ({...prev, refreshLoading: true}));
      else setLoading(prev => ({...prev, initial: true}));
      const response = await ProfileApi.getDocuments();
      if (response.code === 200) {
        setDocuments(response.data);
        setDocumentDetails(prev => ({
          ...prev,
          name: response.data[0]?.documentDetails ?? '',
          panNumber: response.data[0]?.documentNumber ?? '',
          firmName: response.data[1]?.documentDetails ?? '',
          gstin: response.data[1]?.documentNumber ?? '',
        }));
      } else {
        showToast(response.data.message);
      }
    } catch (error: any) {
      showToast(error?.message);
    } finally {
      setLoading(prev => ({...prev, refreshLoading: false, initial: false}));
    }
  };
  const handlePanCardImage = () => {
    ImagePickerService.pickImageWithPrompt(image => {
      if (image?.uri) {
        setDocumentDetails(prev => ({...prev, panCardURI: image.uri ?? ''}));
        setImageData(prev => ({...prev, panCard: image}));
      }
    });
  };
  const handleGstCardImage = () => {
    ImagePickerService.pickImageWithPrompt(image => {
      if (image?.uri) {
        setDocumentDetails(prev => ({...prev, gstCardURI: image.uri ?? ''}));
        setImageData(prev => ({...prev, gstCard: image}));
      }
    });
  };

  const onChangehandle = (
    type: 'name' | 'panNumber' | 'firmName' | 'gstin',
    text: string,
  ) => {
    setDocumentDetails(prev => ({...prev, [type]: text}));
  };

  const uploadDocument = async (type: 'pan' | 'gst') => {
    if (type === 'pan') {
      if (!imageData?.panCard) {
        showToast('Only JPG and PNG images are allowed.');
        return;
      }
    } else {
      if (!imageData?.gstCard) {
        showToast('Only JPG and PNG images are allowed.');
        return;
      }
    }
    try {
      if (type === 'pan') setLoading(prev => ({...prev, panLoading: true}));
      else setLoading(prev => ({...prev, gstLoading: true}));
      const body = {
        documents: type === 'pan' ? imageData?.panCard : imageData?.gstCard,
        documentName: type,
        userId: user?.id,
        documentDetails:
          type === 'pan' ? documentDetails.name : documentDetails.firmName,
        documentNumber:
          type === 'pan' ? documentDetails.panNumber : documentDetails.gstin,
      };
      const response = await DocumentApi.uploadDocument(body);

      if (response.code === 200 && !response.error) {
        if (response.data.statusCode === 200) {
          showToast(response.data.message);
          goBack();
        }
      } else {
        showToast(response.data);
      }
    } catch (error: any) {
      console.log('error', error);
      showToast(error?.message);
    } finally {
      setLoading(prev => ({...prev, gstLoading: false, panLoading: false}));
    }
  };

  const onRefresh = async () => {
    await getDocumentDetails(true);
  };
  return {
    getDocumentDetails,
    documents,
    handlePanCardImage,
    handleGstCardImage,
    imageData,
    onChangehandle,
    documentDetails,
    uploadDocument,
    loading,
    onRefresh,
  };
};

export default useProfileDocumentsService;
