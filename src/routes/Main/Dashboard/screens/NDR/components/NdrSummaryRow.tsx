import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';

type Props = {
  data: {
    totalNdr: number;
    autoNdr: number;
    actionableCount: number;
    addressIssueCount: number;
  };
  activeTab: 'Total NDR' | 'Actionable' | 'Address Issue' | 'Auto NDR';
  onPress?: (item: {label: string; value: number}) => void;
};
const NdrSummaryRow = (props: Props) => {
  const {data, activeTab, onPress} = props;
  const summaryList = [
    {label: 'Total NDR', value: data.totalNdr},
    {label: 'Actionable', value: data.actionableCount},
    {label: 'Address Issue', value: data.addressIssueCount},
    {label: 'Auto NDR', value: data.autoNdr},
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {summaryList.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.item,
              {
                backgroundColor: item.label === activeTab ? '#ccc' : '#f2f2f2',
              },
            ]}
            onPress={() => onPress?.(item)}>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 12,
    gap: 12,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 8,
    color: '#666',
    marginTop: 4,
  },
});

export default NdrSummaryRow;
