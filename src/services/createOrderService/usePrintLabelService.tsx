import {useState} from 'react';
import {CreateOrderApi} from '../../networking';
import {usePrintLabelStore} from '../../store';
import {navigate} from '../../navigation';
import {savePdfWithDocumentPicker, showToast} from '../../utils';
import {Buffer} from '@craftzdog/react-native-buffer';

const usePrintLabelService = () => {
  const {
    appendOrder,
    clearOrders,
    error,
    loading,
    orders,
    removeOrder,
    setError,
    setLoading,
    setOrder,
    pagination,
    setPagination,
  } = usePrintLabelStore();

  const [printLabelLoading, setPrintLabelLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const fetchOrders = async (refresh: boolean, next: boolean, page: number) => {
    try {
      if (refresh) setLoading('refreshLoading', true);
      else if (next) setLoading('loadMoreLoading', true);
      else setLoading('loading', true);
      const response = await CreateOrderApi.getPrintLabel(
        {orderLive: true, rtoMarked: false, status: 'Manifested'},
        page,
      );

      if (page === 0) {
        setOrder(response.data.content);
      } else {
        appendOrder(response.data.content);
      }

      const pagination = {
        currentPage: page + 1,
        totalPages: response.data.totalPages,
        pageSize: response.data.size,
        totalItems: response.data.totalElements,
      };
      setPagination(pagination);
    } catch (error: any) {
      setError(error.message);
      console.log('Error fetchOrders', error);
    } finally {
      setLoading('loading', false);
      setLoading('loadMoreLoading', false);
      setLoading('refreshLoading', false);
    }
  };

  const handleLoadMore = async () => {
    if (
      loading.loadMoreLoading ||
      pagination?.currentPage >= pagination?.totalPages
    ) {
      return;
    }
    await fetchOrders(false, true, pagination?.currentPage);
  };

  const onRefresh = async () => {
    await fetchOrders(true, false, 0);
  };

  const toggleSelectOrder = (id: string) => {
    setSelectionMode(true);
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const handlePress = (item: any) => {
    if (selectionMode && selectedOrders.length > 0) {
      toggleSelectOrder(item.id);
    } else {
      navigate('ProductTracking', {
        id: item.id,
        wayBill: item.waybill,
      });
    }
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
      setSelectionMode(false);
    } else {
      const allIds = orders
        ?.map(order => order?.id)
        .filter(Boolean) as string[];
      setSelectedOrders(allIds);
      setSelectionMode(true);
    }
  };

  const askPageCountAndPrintLabel = () => {
    setModalLoading(true);
  };

  const printAllLabel = async (totalPage: 1 | 2 | 4) => {
    try {
      setPrintLabelLoading(true);
      const response = await CreateOrderApi.savePrintLabel(
        totalPage,
        selectedOrders,
      );

      if (response.code === 200) {
        const pdfBase64 = Buffer.from(response.data).toString('base64');

        const fileName = `order-label-${Date.now()}.pdf`;

        const check = await savePdfWithDocumentPicker(pdfBase64, fileName);
        if (check) {
          setSelectedOrders([]);
          setModalLoading(false);
        }
      } else {
        showToast('Failed to generate the label. Please try again later.');
      }
    } catch (error: any) {
      console.log('Error', error);
      showToast(
        error.message || 'An unexpected error occurred while saving the label.',
      );
    } finally {
      setPrintLabelLoading(false);
    }
  };

  return {
    selectedOrders,
    setSelectedOrders,
    selectionMode,
    setSelectionMode,
    loading,
    orders,
    error,
    fetchOrders,
    handleLoadMore,
    onRefresh,
    toggleSelectOrder,
    toggleSelectAll,
    handlePress,
    printAllLabel,
    askPageCountAndPrintLabel,
    modalLoading,
    setModalLoading,
    printLabelLoading,
  };
};

export default usePrintLabelService;
