import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';

type PillOption = {
  id: number;
  label: string;
  filterOption: string | null;
};

type FilterPillRowProps = {
  data: PillOption[];
  selectedValue: string | null;
  onSelect: (option: string | null) => void;
};

const FilterPillRow = ({data, selectedValue, onSelect}: FilterPillRowProps) => {
  const renderItem = ({item}: {item: PillOption}) => {
    const isSelected = selectedValue === item.filterOption;
    return (
      <TouchableOpacity
        onPress={() => onSelect(item.filterOption)}
        style={[
          styles.categoryPill,
          {
            backgroundColor: isSelected ? '#4F46E5' : '#F3F4F6',
            borderColor: isSelected ? 'transparent' : '#D1D5DB',
            elevation: isSelected ? 3 : 1,
          },
        ]}>
        <Text
          style={[
            styles.categoryText,
            {color: isSelected ? 'white' : '#374151'},
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryListContainer}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  categoryPill: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  categoryListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryWrapper: {
    marginBottom: 8,
  },
});

export default FilterPillRow;
