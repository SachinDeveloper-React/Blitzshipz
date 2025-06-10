import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AddDocumentCard, ShownDocument} from '../../../../../components';

const PANCardForm = ({
  data,
  handleSubmit,
  handleDocument,
  documentDetails,
  onChangeHandle,
  loading,
}: {
  data: {
    id: string;
    userId: string;
    documentName: string;
    documentNumber: string;
    documentDetails: string;
    status: string;
    verify: boolean;
    image: {
      fileName: string;
      data: {
        type: number;
        data: string;
      };
    }[];
  };
  handleSubmit?: () => void;
  handleDocument?: () => void;
  documentDetails: {
    name: string;
    panNumber: string;
    firmName: string;
    gstin: string;
    panCardURI: string;
    gstCardURI: string;
  };
  onChangeHandle: (
    type: 'name' | 'panNumber' | 'firmName' | 'gstin',
    text: string,
  ) => void;
  loading: {
    initial: boolean;
    panLoading: boolean;
    gstLoading: boolean;
  };
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={require('../../../../../assets/uploadDocument/pancard.jpeg')}
            style={styles.icon}
            resizeMode="cover"
          />
          <Text style={styles.title}>PAN card</Text>
          <Text style={styles.info}>ⓘ</Text>
        </View>

        {/* Note */}
        <Text style={styles.note}>
          Note: Once you have submitted the details, then you cannot modify. If
          verification fails, then only you can submit the details again.
        </Text>

        <Text style={styles.label}>Name as per Pan Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={documentDetails.name}
          onChangeText={text => onChangeHandle('name', text)}
        />

        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN number"
          value={documentDetails.panNumber}
          autoCapitalize="characters"
          maxLength={10}
          onChangeText={text => onChangeHandle('panNumber', text)}
        />

        {(data?.image?.length ?? 0) === 0 && !documentDetails.panCardURI ? (
          <AddDocumentCard onPress={handleDocument} />
        ) : (
          <ShownDocument
            onPress={handleDocument}
            uri={
              documentDetails.panCardURI ||
              `data:image/png;base64,${data?.image?.[0]?.data?.data}`
            }
          />
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={data.verify || loading.gstLoading}>
          {loading.gstLoading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <Text style={styles.submitText}>Submit For Verification</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PANCardForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  info: {
    fontSize: 18,
    color: '#888',
  },
  note: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
    lineHeight: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 16,
    marginBottom: 24,
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteIcon: {
    fontSize: 20,
    color: 'red',
  },
  submitButton: {
    backgroundColor: '#002f5e',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
