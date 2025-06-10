import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const RateCalculatorApi = {
  rateCalculator: async (body: {
    declaredAmount: string;
    destionationPincode: string;
    direction: string;
    originPincode: string;
    paymentMode: string;
    standard: string;
    weight: string;
  }) => {
    try {
      const response = await ApiClient.post(
        URLS.RATECALCULATOR.CALCULATOR,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileDetails => error', error);
      return errorHandler(error);
    }
  },
  rateCard: async (body: {standard: string; shipmentType: string}) => {
    try {
      const response = await ApiClient.post(URLS.RATECALCULATOR.CARD, body);
      return responseHandler(response);
    } catch (error) {
      console.log('DEBUG: getProfileDetails => error', error);
      return errorHandler(error);
    }
  },
};

export default RateCalculatorApi;
