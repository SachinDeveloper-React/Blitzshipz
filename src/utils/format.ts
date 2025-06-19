import {DateType} from 'react-native-ui-datepicker';

export const formatDate = (date?: DateType) => {
  if (!date || !(date instanceof Date)) return '';
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};
