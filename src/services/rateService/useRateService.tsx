import React, {useState} from 'react';
import {RateCalculatorApi} from '../../networking';
import {showToast} from '../../utils';

type Props = {};

const useRateService = () => {
  const [form, setForm] = useState({
    grade: 'SILVER',
    origin: '',
    destination: '',
    weight: '',
    shipmentType: 'Forward',
    paymentMode: 'Prepaid',
    declaredAmount: '',
  });
  const [rateCardForm, setRateCardForm] = useState<{
    standard: string;
    shipmentType: string;
  }>({standard: 'SILVER', shipmentType: 'Forward'});
  const [calculaterData, setCalculaterData] = useState([]);
  const [rateCardData, setRateCardData] = useState([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [rateCardLoading, setRateCardLoading] = useState(false);
  const handleChange = (field: string, value: string) => {
    setForm({...form, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  const rateCardhandleChange = (
    type: 'standard' | 'shipmentType',
    value: string,
  ) => {
    setRateCardForm(prev => ({...prev, [type]: value}));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.origin || form.origin.length !== 6)
      newErrors.origin = 'Enter valid 6-digit pincode';
    if (!form.destination || form.destination.length !== 6)
      newErrors.destination = 'Enter valid 6-digit pincode';
    if (!form.weight || isNaN(Number(form.weight)) || Number(form.weight) <= 0)
      newErrors.weight = 'Enter valid weight in kg';
    if (
      !form.declaredAmount ||
      isNaN(Number(form.declaredAmount)) ||
      Number(form.declaredAmount) < 0
    )
      newErrors.declaredAmount = 'Enter valid declared amount';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      calculator();
    }
  };

  const calculator = async () => {
    try {
      setLoading(true);

      const body = {
        declaredAmount: form.declaredAmount,
        destionationPincode: form.destination,
        direction: form.shipmentType,
        originPincode: form.origin,
        paymentMode: form.paymentMode,
        standard: 'SILVER',
        weight: form.weight,
      };

      const response = await RateCalculatorApi.rateCalculator(body);

      if (response.code === 200) {
        setCalculaterData(response.data);
      } else {
        console.error('Rate calculator API responded with error:', response);
        showToast(
          response.data.message ||
            'Something went wrong while calculating rates.',
        );
      }
    } catch (error: any) {
      console.error('Rate calculator error:', error);

      showToast(
        error?.message ||
          'Unable to fetch rate calculation. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchRateCard = async () => {
    try {
      setRateCardLoading(true);

      const response = await RateCalculatorApi.rateCard({
        shipmentType: rateCardForm.shipmentType,
        standard: rateCardForm.standard,
      });

      if (response.code === 200) {
        setRateCardData(response.data);
      } else {
        console.error('Rate calculator API responded with error:', response);
        showToast(
          response.data.message ||
            'Something went wrong while calculating rates.',
        );
      }
    } catch (error: any) {
      console.error('Rate calculator error:', error);

      showToast(
        error?.message ||
          'Unable to fetch rate calculation. Please try again later.',
      );
    } finally {
      setRateCardLoading(false);
    }
  };

  return {
    calculator,
    onSubmit,
    handleChange,
    form,
    errors,
    calculaterData,
    loading,
    fetchRateCard,
    rateCardData,
    rateCardLoading,
    rateCardForm,
    setRateCardForm,
    rateCardhandleChange,
  };
};

export default useRateService;
