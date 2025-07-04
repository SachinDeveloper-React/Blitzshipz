import {Asset} from 'react-native-image-picker';
import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';
import {Platform} from 'react-native';

const ProfileApi = {
  updateProfile: async (body: {documents?: Asset | undefined; id: string}) => {
    try {
      console.log('body', body);
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

      const response = await ApiClient.postForm(
        `${URLS.DOCUMENT.UPLOAD}?documentName=logo&documentNumber=&documentDetails=&userId=${body.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileDetails => error', error);
      return errorHandler(error);
    }
  },

  getProfileDetails: async () => {
    try {
      const response = await ApiClient.get(URLS.PROFILE.PROFILEDETAILS);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileDetails => error', error);
      return errorHandler(error);
    }
  },
  getProfileWarehouses: async (id: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.PROFILE.VIEWWAREHOUSES}?userId=${id}`,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileWarehouses => error', error);
      return errorHandler(error);
    }
  },
  getProfileDocs: async () => {
    try {
      const response = await ApiClient.get(`${URLS.PROFILE.VIEWPROFILEDOCS}`);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileWarehouses => error', error);
      return errorHandler(error);
    }
  },
  getProfileBankDetails: async (id: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.PROFILE.GETBANKDETAILS}?userId=${id}`,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileBankDetails => error', error);
      return errorHandler(error);
    }
  },
  getProfileMyProduct: async () => {
    try {
      const response = await ApiClient.get(URLS.PROFILE.GETMYPRODUCT);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileMyProduct => error', error);
      return errorHandler(error);
    }
  },

  editProfile: async (body: {
    id: string;
    email: string;
    password: string;
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
  }) => {
    try {
      const response = await ApiClient.post(URLS.PROFILE.EDIT, body);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: editProfile => error', error);
      return errorHandler(error);
    }
  },

  getCategories: async () => {
    try {
      const response = await ApiClient.get(URLS.PRODUCT.GETALLCATEGORY);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getCategories => error', error);
      return errorHandler(error);
    }
  },
  addProduct: async (body: {
    categoryId: string;
    categoryName: string;
    productPrice: string;
    productName: string;
    weight: string;
    tax: string;
    l: string;
    b: string;
    h: string;
    volume: number;
    productCode: string;
  }) => {
    try {
      const response = await ApiClient.post(URLS.PRODUCT.ADDPRODUCT, body);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: addProduct => error', error);
      return errorHandler(error);
    }
  },
  editProduct: async (
    id: string,
    body: {
      categoryId: string;
      categoryName: string;
      productPrice: string;
      productName: string;
      weight: string;
      tax: string;
      l: string;
      b: string;
      h: string;
      volume: number;
      productCode: string;
    },
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.PRODUCT.EDITPRODUCT}${id}`,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: addProduct => error', error);
      return errorHandler(error);
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const response = await ApiClient.delete(
        `${URLS.PRODUCT.DELETEPRODUCT}${id}`,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: addProduct => error', error);
      return errorHandler(error);
    }
  },

  editBankDetails: async (body: {
    beneficiaryName: string;
    accountNumber: string | number;
    accountType: string;
    ifscCode: string;
    bankName: string;
    documents?: Asset | undefined;
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
      formData.append('beneficiaryName', body.beneficiaryName);
      formData.append('accountNumber', String(body.accountNumber));
      formData.append('accountType', body.accountType);
      formData.append('ifscCode', body.ifscCode);
      formData.append('bankName', body.bankName);

      formData.append('documents', {
        uri:
          Platform.OS === 'ios'
            ? body.documents.uri.replace('file://', '')
            : body.documents.uri,
        type: body.documents.type,
        name: body.documents.fileName,
      } as any);

      const response = await ApiClient.postForm(
        URLS.PROFILE.EDITBANKDETAILS,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getCategories => error', error);
      return errorHandler(error);
    }
  },

  getDocuments: async () => {
    try {
      const response = await ApiClient.get(URLS.PROFILE.GETDOCUMENTS);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getDocuments => error', error);
      return errorHandler(error);
    }
  },

  upadtePassword: async (
    oldPassword: string,
    newPassword: string,
    id: string,
  ) => {
    try {
      const response = await ApiClient.put(
        `${URLS.PROFILE.UPDATEPASSWORD}?oldPassword=${oldPassword}&newPassword=${newPassword}&id=${id}`,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: upadtePassword => error', error);
      return errorHandler(error);
    }
  },
};

export default ProfileApi;
