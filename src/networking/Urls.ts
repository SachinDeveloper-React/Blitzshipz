const isProduction = true;
export const BASE_URL = isProduction ? 'https://backend.Blitzshipz.com' : '';
export const URLS = {
  AUTH: {
    LOGIN: '/user/auth/login',
  },
  DASHBOARD: {
    OVERVIEWORDER: '/orders/dashboard/overview-order',
    PICKEDUPDETAILS: '/orders/dashboard/pickedUp-details',
    ORDERDATAREVENUE: '/orders/dashboard/order-data-revenue',
    ORDERDATAGRAPH: '/orders/dashboard/order-data-graph',
    OREDERFILTERUSER: '/orders/filter-user',
    NDR: {
      NDRLIST: '/orders/get-ndr-list',
      NDRORDEROVERVIEW: '/orders/ndr-orders-overview',
      NDRORDERLIST: '/orders/ndr-orders-list',
    },
  },
  TRACK: {
    TRACKORDER: '/orders/track-order',
    TRACKORDERWITHFILTER: '/orders/filter-user',
  },
  SETTING: {
    SUPPORT: '/support/ticket/user-filter',
    RAISEDTICKET: '/support/ticket/create',
    GETCHATBYTICKETID: '/support/ticket/get-responses-ticketId?ticketId=',
    SENDMESSAGE: '/support/ticket/update-response-customer',
  },
  PROFILE: {
    PROFILEDETAILS: '/user/general/details',
    VIEWWAREHOUSES: '/orders/warehouse/view-warehouses',
    GETBANKDETAILS: '/user/banking/get-banking-details',
    GETMYPRODUCT: '/orders/product/get-all-products',
    EDIT: '/user/general/edit-user-details',
    EDITBANKDETAILS: '/user/banking/add-banking-details',
    GETDOCUMENTS: '/user/verification/view-docs',
  },
  COD: {
    CODSUMMARY: '/orders/cod/get-cod-summary',
    CODPAYMENTUSER: '/orders/cod/get-cod-payment-user',
  },
  DISCREPANCY: {
    DISCREPANCY: '/orders/discrepancy/master-filter-user',
  },
  FUNDS: {
    GETBALANCE: '/payments/account/get-balance',
    GETFILTERBALANCE: '/payments/transaction/user-filter',
  },
  WAREHOUSE: {
    PINCODE: 'orders/postal/postoffice-by-pincodev3?pinCode=',
    CREATE: '/orders/warehouse/create',
    EDIT: '/orders/warehouse/edit',
    DELETE: '/orders/warehouse/delete-warehouses',
  },

  CREATEORDER: {
    GETBOOKMYORDER: '/orders/filter-user',
    GETRATES: '/orders/get-rates',
  },
  PRODUCT: {
    GETALLCATEGORY: 'orders/product/get-all-category',
    ADDPRODUCT: 'orders/product/add-product',
    EDITPRODUCT: 'orders/product/edit-product/',
    DELETEPRODUCT: 'orders/product/delete-product?id=',
  },
  DOCUMENT: {
    UPLOAD: '/user/verification/upload-docs',
  },
  RATECALCULATOR: {
    CALCULATOR: '/orders/rate-calculator',
    CARD: '/orders/zone/get-rate-card',
  },
};
