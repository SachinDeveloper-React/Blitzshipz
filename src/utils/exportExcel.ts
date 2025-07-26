import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {Platform, Alert, ToastAndroid} from 'react-native';
import notifee from '@notifee/react-native';
import {saveDocuments} from '@react-native-documents/picker';

async function onDisplayNotification(title: string, body: string) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {id: 'default'},
    },
  });
}

export const exportExcel = async (data: any[], fileName: string) => {
  try {
    if (
      !Array.isArray(data) ||
      data.length === 0 ||
      typeof data[0] !== 'object'
    ) {
      throw new Error('Invalid data: must be a non-empty array of objects');
    }

    // Step 1: Convert JSON to Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

    // Step 2: Save temporarily to app storage
    const tempFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;
    await RNFS.writeFile(tempFilePath, wbout, 'base64');

    // Step 3: Use SAF to export to user-selected location
    const [{uri: savedUri}] = await saveDocuments({
      sourceUris: [`file://${tempFilePath}`],
      copy: true,
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fileName: `${fileName}.xlsx`,
    });

    if (Platform.OS === 'android') {
      ToastAndroid.show('Excel file saved successfully.', ToastAndroid.LONG);
    }

    await onDisplayNotification(
      'Excel Exported',
      'Excel file saved successfully. Tap to open from Files app.',
    );

    return savedUri;
  } catch (err: any) {
    console.error('Export error:', err);
    Alert.alert('Export Failed', err.message || 'Something went wrong');
  }
};
