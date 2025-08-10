import RNFS from 'react-native-fs';
import {saveDocuments} from '@react-native-documents/picker';
import {showToast} from './showToast';

export const savePdfWithDocumentPicker = async (
  pdfContent: string,
  fileName = 'order-label',
) => {
  try {
    const tempFilePath = `${RNFS.TemporaryDirectoryPath}/${fileName}.pdf`;

    await RNFS.writeFile(tempFilePath, pdfContent, 'base64');

    // Step 3: Let the user pick save location
    const [{uri: savedUri}] = await saveDocuments({
      sourceUris: [`file://${tempFilePath}`],
      copy: true,
      mimeType: 'application/pdf',
      fileName: `${fileName}.pdf`,
    });

    console.log('Saved PDF to:', savedUri);
    return true;
  } catch (err: any) {
    if (
      err?.message?.includes('user canceled') ||
      err?.message?.includes('operation was cancelled')
    ) {
      console.log('User canceled document picker');
      return;
    }

    console.error('Error saving PDF:', err);
    showToast('Failed to save PDF. Please try again.');
    return false;
  }
};
