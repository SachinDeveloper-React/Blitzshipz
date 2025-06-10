import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  formContainer: {
    // marginTop: 20,
    flexDirection: 'column',
    gap: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  linearGradient: {
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 12,
  },
  containerLinearGradient: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 60,
    aspectRatio: 60 / 60,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  subtitleText: {
    fontSize: 13,
    color: '#666',
  },
});
