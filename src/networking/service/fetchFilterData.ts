import {FilterApi} from '../api';

export const fetchFilterData = (body: {
  day: number;
  fromDate: string | null;
  orderId: string;
  paymentMode: string;
  phoneNumber: string;
  productCategory: string;
  referenceNumber: string;
  status: string | null;
  toDate: string | null;
  waybill: string;
}) => {
  try {
    const response = FilterApi.excelFilterUser(body, 0);

    return response;
  } catch (error) {
    return {
      data: {
        content: [],
      },
    };
  }
};
