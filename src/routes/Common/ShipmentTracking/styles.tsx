import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 6,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  gapcolumn: {flexDirection: 'column', gap: 20},

  boxContainer: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
    borderRadius: 6,
  },
  productIssueBoxContainer: {
    backgroundColor: '#FFF6EC',
    borderWidth: 1,
    borderColor: '#FFCC99',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 20,
    gap: 10,
    borderRadius: 6,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 10,
    flexShrink: 1,
  },
  text: {
    color: '#fff',
  },
  productIssueText: {
    color: '#000',
  },
});
