type VendorData = {
  vendorCode: string;
  value: number;
  total: number;
};

export type APIDataItem = {
  date: string;
  vendorData: VendorData[];
};

type LineChartData = {
  value: number;
  label?: string;
  dataPointText?: string;
};

export const processData = (
  data: APIDataItem[],
  vendorCode: string,
): LineChartData[] => {
  return data.map(item => {
    const formattedDate = item.date
      ? new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        })
      : 'Invalid Date';

    const vendor = item.vendorData.find(v => v.vendorCode === vendorCode);
    const totalValue = vendor?.value ?? 0;

    return {
      value: Number(totalValue),
      label: String(formattedDate),
      dataPointText: String(totalValue),
    };
  });
};

export const vendorColors: Record<string, string> = {
  DL: '#ef544b',
  DT: '#223f63',
  BD: '#5cc56e',
};

type VendorCode = '' | 'DL' | 'DT' | 'BD';

export const vendors: {code: VendorCode; name: string}[] = [
  {code: 'DL', name: 'Delhivery'},
  {code: 'DT', name: 'DTDC'},
  {code: 'BD', name: 'Blue Dart'},
];

export const orders = [
  {title: 'Total Orders', count: 86, icon: 'truck', color: '#6B7FD7'},
  {title: 'Live Orders', count: 1, icon: 'truck', color: '#F4C03E'},
  {title: 'Pickup Scheduled', count: 2, icon: 'truck', color: '#7C4DFF'},
  {title: 'Fulfilled Orders', count: 14, icon: 'truck', color: '#4CAF50'},
  {title: 'Non Delivered', count: '--', icon: 'truck', color: '#9E9E9E'},
  {title: 'Cancelled Orders', count: 8, icon: 'truck', color: '#1E88E5'},
  {title: 'Return Orders', count: 5, icon: 'truck', color: '#FF7043'},
  {title: "Today's Orders", count: '--', icon: 'truck', color: '#E91E63'},
];

export const orderData = [
  {key: 'Live', value: 5, color: '#4A90E2'},
  {key: 'Pickup Scheduled', value: 8, color: '#673AB7'},
  {key: 'Fulfilled', value: 30, color: '#4CAF50'},
  {key: 'Non Delivered', value: 12, color: '#E57373'},
  {key: 'Cancelled', value: 20, color: '#78909C'},
  {key: 'Return', value: 15, color: '#A1887F'},
];
