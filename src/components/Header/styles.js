import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 70,
    // height: 100,
    resizeMode: 'contain',
  },
  headerTitleStyle: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
    fontFamily: 'Roboto-Light',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
});
