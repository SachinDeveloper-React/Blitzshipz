import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export const exportExcel = async (data: any[], fileName: string) => {
  if (
    !Array.isArray(data) ||
    data.length === 0 ||
    typeof data[0] !== 'object'
  ) {
    throw new Error('Invalid data: must be a non-empty array of objects');
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

  const path = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;

  await RNFS.writeFile(path, wbout, 'base64');

  await Share.open({
    url: `file://${path}`,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    filename: fileName,
    title: `${fileName}.xlsx`,
  });
};
