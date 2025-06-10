import React, {useEffect, useState} from 'react';
import {useFundStore, useTransactionStore} from '../../store';
import {FundApi} from '../../networking';

type Props = {};

const useFundService = () => {
  const {balance, updateBalance} = useFundStore();
  const {
    setTransactions,
    addTransaction,
    transactions,
    addDeductions,
    addRecharges,
    addRefundes,
    deductions,
    pagination,
    recharges,
    refundes,
    setDeductions,
    setRecharges,
    setRefundes,
  } = useTransactionStore();
  const [loading, setLoading] = useState({
    transaction: true,
    refreshTransaction: false,
    loadMoreTransaction: false,
    recharges: true,
    refreshRecharges: false,
    loadMoreRecharges: false,

    refunds: true,
    refreshRefunds: false,
    loadMoreRefunds: false,

    deductions: true,
    refreshDeductions: false,
    loadMoreDeductions: false,
  });
  const getBalance = async () => {
    try {
      const response = await FundApi.getBalance();
      if (response.code === 200 && !response.error) {
        updateBalance(response.data);
      }
    } catch (error) {
      console.log('DEBUG: Error fetching the balance', error);
    }
  };

  const getFilterTransactions = async (
    type: 'transaction' | 'rechanges' | 'refunds' | 'deductions',
    page: number,
    refresh?: boolean,
    next?: boolean,
  ) => {
    try {
      if (refresh) {
        if (type === 'transaction')
          setLoading({...loading, refreshTransaction: true});
        else if (type === 'rechanges')
          setLoading({...loading, refreshRecharges: true});
        else if (type === 'refunds')
          setLoading({...loading, refreshRefunds: true});
        else if (type === 'deductions')
          setLoading({...loading, refreshDeductions: true});
      } else if (next) {
        if (type === 'transaction')
          setLoading({...loading, loadMoreTransaction: true});
        else if (type === 'rechanges')
          setLoading({...loading, loadMoreRecharges: true});
        else if (type === 'refunds')
          setLoading({...loading, loadMoreRefunds: true});
        else if (type === 'deductions')
          setLoading({...loading, loadMoreDeductions: true});
      } else {
        if (type === 'transaction') setLoading({...loading, transaction: true});
        else if (type === 'rechanges')
          setLoading({...loading, recharges: true});
        else if (type === 'refunds') setLoading({...loading, refunds: true});
        else if (type === 'deductions')
          setLoading({...loading, deductions: true});
      }
      const body = {
        orderId: '',
        waybillNumber: null,
        transactionType:
          type === 'rechanges'
            ? 'RECHARGE'
            : type === 'refunds'
            ? 'REFUND'
            : type === 'deductions'
            ? 'DEDUCTION'
            : null,
        minAmount: '',
        maxAmount: '',
        status: null,
      };
      const response = await FundApi.getFilterBalance(body, page);

      if (response.code === 200) {
        const paginationData = {
          currentPage: page + 1,
          totalPages: response.data.totalPages,
          pageSize: response.data.size,
          totalItems: response.data.totalElements,
        };

        if (page === 0) {
          if (type === 'transaction') {
            setTransactions(response.data.content, paginationData);
          } else if (type === 'rechanges') {
            setRecharges(response.data.content, paginationData);
          } else if (type === 'refunds') {
            setRefundes(response.data.content, paginationData);
          } else if (type === 'deductions') {
            setDeductions(response.data.content, paginationData);
          }
        } else {
          if (type === 'transaction') {
            addTransaction(response.data.content, paginationData);
          } else if (type === 'rechanges') {
            addRecharges(response.data.content, paginationData);
          } else if (type === 'refunds') {
            addRefundes(response.data.content, paginationData);
          } else if (type === 'deductions') {
            addDeductions(response.data.content, paginationData);
          }
        }
      }
    } catch (error) {
      console.log('DEBUG: Error to get transaction', error);
    } finally {
      setLoading({
        ...loading,
        transaction: false,
        loadMoreRecharges: false,
        loadMoreTransaction: false,
        recharges: false,
        refreshRecharges: false,
        refreshTransaction: false,
        deductions: false,
        loadMoreDeductions: false,
        loadMoreRefunds: false,
        refreshDeductions: false,
        refreshRefunds: false,
        refunds: false,
      });
    }
  };

  const loadMore = async (
    type: 'transaction' | 'rechanges' | 'refunds' | 'deductions',
  ) => {
    getFilterTransactions(type, pagination?.currentPage ?? 1, false, true);
  };
  const onRefresh = async (
    type: 'transaction' | 'rechanges' | 'refunds' | 'deductions',
  ) => {
    getFilterTransactions(type, 0, true, false);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return {
    balance,
    getFilterTransactions,
    transactions,
    deductions,
    pagination,
    recharges,
    refundes,
    loadMore,
    onRefresh,
    loading,
  };
};

export default useFundService;
