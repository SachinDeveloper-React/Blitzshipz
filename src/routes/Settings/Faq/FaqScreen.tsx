import React, {useLayoutEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from 'react-native';
import {faqData, prohibitedItems} from './helper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import {CustomIcons, CustomText} from '../../../components';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FaqScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'FaqScreen'>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [type, setType] = useState<'FAQ' | 'PROHIBITED'>('FAQ');
  const toggleAnswer = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{marginRight: 15}}>
            <Pressable
              onPress={
                type === 'FAQ'
                  ? () => setType('PROHIBITED')
                  : () => setType('FAQ')
              }>
              <CustomIcons
                type="MaterialCommunityIcons"
                name={type === 'FAQ' ? 'block-helper' : 'format-list-bulleted'}
                size={20}
                color="red"
              />
            </Pressable>
          </View>
        );
      },
    });
  }, [navigation, type]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {type === 'FAQ' ? (
        <FlatList
          data={faqData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => toggleAnswer(index)}>
                <Text style={styles.question}>{item.question}</Text>
              </TouchableOpacity>
              {activeIndex === index && (
                <View style={styles.answerContainer}>
                  {item.answer.map((line, i) => (
                    <Text key={i} style={styles.answerText}>
                      • {line}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <FlatList
          data={prohibitedItems}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={styles.itemWrapper}>
              <View style={styles.bullet} />
              <CustomText style={styles.itemText}>{item}</CustomText>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  answerContainer: {
    marginTop: 10,
  },
  answerText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginTop: 8,
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
});
