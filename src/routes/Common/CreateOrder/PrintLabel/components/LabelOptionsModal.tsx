import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
// import {CheckBox} from '@rneui/themed'; // or use react-native-paper Checkbox

type Props = {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onDownload: (
    perPage: number,
    showReturn: boolean,
    showMobile: boolean,
  ) => void;
};

const LabelOptionsModal: React.FC<Props> = ({
  visible,
  onClose,
  onDownload,
  loading,
}) => {
  const [selected, setSelected] = useState<1 | 2 | 4>(4);
  const [showReturn, setShowReturn] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const options = [
    {value: 1, label: '1 per page'},
    {value: 2, label: '2 per page'},
    {value: 4, label: '4 per page'},
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>Select Label Options</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {/* Options */}
          <View style={styles.optionsRow}>
            {options.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.optionCard,
                  selected === opt.value && styles.selectedCard,
                ]}
                onPress={() => setSelected(opt.value as 1 | 2 | 4)}>
                <View style={styles.dashedBoxWrapper}>
                  {Array.from({length: opt.value}).map((_, i) => (
                    <View key={i} style={styles.dashedBox} />
                  ))}
                </View>
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Download button */}
          <TouchableOpacity
            disabled={loading}
            style={styles.downloadBtn}
            onPress={() => onDownload(selected, showReturn, showMobile)}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.downloadText}>Download</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LabelOptionsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeBtn: {
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    color: '#333',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 4,
    padding: 10,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#007bff',
    backgroundColor: '#f0f6ff',
  },
  dashedBoxWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dashedBox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    margin: 2,
  },
  optionLabel: {
    fontSize: 14,
    color: '#333',
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  downloadBtn: {
    marginTop: 20,
    backgroundColor: '#002B5B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
