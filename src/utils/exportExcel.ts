import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {Platform, Alert, ToastAndroid, Linking} from 'react-native';
import {requestFilePermission} from './permission';
import {showToast} from './showToast';
import notifee from '@notifee/react-native';

async function onDisplayNotification(title: string, body: string) {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon',
      pressAction: {
        id: 'default',
      },
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

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

    let filePath: string;

    if (Platform.OS === 'android') {
      const request = await requestFilePermission();
      console.log('dmcd', request);
      if (!request) {
        showToast('Permission Denied');
        Linking.openSettings();
        return;
      }
      filePath = `${RNFS.DownloadDirectoryPath}/${fileName}.xlsx`;
    } else {
      // iOS: Use DocumentDirectoryPath
      filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;
    }

    await RNFS.writeFile(filePath, wbout, 'base64');

    // Notify user
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Excel file has been saved to your Downloads folder.',
        ToastAndroid.LONG,
      );
      onDisplayNotification(
        'Download Complete',
        'Your Excel file is saved in Downloads.',
      );
    } else {
      onDisplayNotification(
        'File Saved',
        'Excel file has been saved to app storage.\nTap "Share" to export it to the Files app or elsewhere.',
      );
    }

    // Offer sharing to Files app on iOS

    if (Platform.OS === 'ios') {
      await Share.open({
        url: `file://${filePath}`,
        title: `${fileName}.xlsx`,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        failOnCancel: false,
      });
    }

    return filePath;
  } catch (err: any) {
    console.error('Export error:', err);
    Alert.alert('Export Failed', err.message || 'Something went wrong');
  }
};
