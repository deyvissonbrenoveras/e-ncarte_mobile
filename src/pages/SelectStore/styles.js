import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  search: {
    height: 50,
    padding: 0,
  },
  cardTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20,
  },
  card: {
    flex: 1 / 2,
    justifyContent: 'center',
    padding: 5,
  },
  cardAvatar: {
    backgroundColor: '#fff',
    resizeMode: 'contain',
    width: '100%',
    height: 64,
    borderRadius: 32,
  },
  cardText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
});
