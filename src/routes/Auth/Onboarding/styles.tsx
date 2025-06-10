import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: '80%',
    height: '30%',
  },
  textContainer: {
    width: '100%',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 12,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
    marginHorizontal: 5,
  },
});
