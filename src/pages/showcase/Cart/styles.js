import { StyleSheet } from 'react-native';
import theme from '~/styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyCart: {
    // minHeight: 250,
    // borderWidth: 1,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
  },
  emptyCartColor: {
    color: theme.colors.greyBorder,
  },
  productCard: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    flexDirection: 'row',
  },
  productImage: {
    maxWidth: 65,
    maxHeight: 100,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  productContent: {
    flex: 1,
  },
  productInfo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    padding: 10,
    fontSize: 10,
  },
  productName: {
    color: '#000',
    fontSize: 12,
  },
  productPrice: {
    alignSelf: 'flex-start',
    marginTop: 2,
    color: theme.colors.encarte,
    fontSize: 12,
  },
  featuredPrice: {
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'flex-start',
    padding: 2,
    color: '#ff0000',
    backgroundColor: 'yellow',
    borderRadius: 4,
    margin: 2,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    fontWeight: 'bold',
  },
  specialOfferProductPrice: {
    color: '#ff0000',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    padding: 2,
    backgroundColor: 'yellow',
    margin: 2,
    marginLeft: 4,
    fontSize: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    textAlign: 'center',
  },
  amountArea: {
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  productAmount: {
    fontSize: 10,
  },
  iconColor: {
    color: theme.colors.encarte,
  },
  subTotal: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '80%',
  },
  subTotalText: {
    fontSize: 11,
    color: '#000',
  },
  subTotalPrice: {
    fontSize: 11,
    color: theme.colors.encarte,
  },
});
