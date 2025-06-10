import {Asset} from 'react-native-image-picker';
import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';
import {Platform} from 'react-native';

const DocumentApi = {
  uploadDocument: async (body: {
    documents: Asset | undefined;
    documentName: string;
    userId: string | undefined;
    documentDetails: string;
    documentNumber: string;
  }) => {
    try {
      if (
        !body.documents?.uri ||
        !body.documents?.type ||
        !body.documents?.fileName
      ) {
        throw new Error('Invalid image');
      }

      const formData = new FormData();

      formData.append('documents', {
        uri:
          Platform.OS === 'ios'
            ? body.documents.uri.replace('file://', '')
            : body.documents.uri,
        type: body.documents.type,
        name: body.documents.fileName,
      } as any);

      const response = await ApiClient.post(
        `${URLS.DOCUMENT.UPLOAD}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            documentName: body.documentName,
            userId: body.userId,
            documentDetails: body.documentDetails,
            documentNumber: body.documentNumber,
          },
        },
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default DocumentApi;
