import { StyleSheet } from 'react-native';
import theme from '~/styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  showcaseLogoButton: {
    elevation: 5,
    backgroundColor: '#fff',
  },
  showcaseLogo: {
    height: 100,
    resizeMode: 'contain',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 3,
    textAlign: 'center',
    color: '#000',
    lineHeight: 16,
    marginTop: 15,
  },
  carouselContainer: {},
  carouselItem: {
    alignSelf: 'center',
    width: '85%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  carouselProduct: {
    flex: 0.48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselProductInfo: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    height: 90,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  carouselProductImage: {
    width: '100%',
    height: '100%',
    maxHeight: 100,
    resizeMode: 'contain',
  },
  carouselProductName: {
    fontSize: 15,
    overflow: 'hidden',
    color: '#000',
  },
  carouselProductPrice: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  carouselSnapArea: {
    position: 'relative',
    top: -105,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carouselAdvertisementItem: {
    width: '85%',
    height: 200,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  carouselAdvertisementImg: {
    resizeMode: 'contain',
    width: '100%',
    height: 200,
  },
  carouselLeftSnapButton: {},
  patnerList: {},
  partnerItem: {
    width: 80,
    padding: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: 'contain',
  },
  partnerName: {
    fontSize: 10,
    textAlign: 'center',
  },
  featuredProductsList: {
    marginTop: 10,
  },
  featuredProductItem: {
    flex: 1 / 3,
    // justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff',
    margin: 1,
  },
  featuredProductImage: {
    width: 80,
    height: 80,
    maxWidth: 80,
    maxHeight: 80,
    resizeMode: 'contain',
  },
  searchInput: {
    justifyContent: 'center',
  },
  categoryName: {
    color: '#616161',
    letterSpacing: 3,
    marginLeft: 4,
    marginTop: 8,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 17,
    flex: 1,
  },
  productCard: {
    height: 100,
    alignItems: 'center',
    paddingLeft: 2,
    flexDirection: 'row',
    elevation: 3,
    backgroundColor: '#fff',
    marginVertical: 4,
    marginHorizontal: 2,
  },
  productImage: {
    width: '100%',
    height: '100%',
    maxWidth: 48,
    maxHeight: 60,
    resizeMode: 'contain',
  },
  productContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    textAlign: 'right',
    fontSize: 13,
    width: '100%',
    height: '100%',
    padding: 4,
    flex: 1,
  },
  productName: {
    color: '#000',
    textAlign: 'right',
  },
  productPrice: {
    color: theme.colors.encarte,
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuredPrice: {
    padding: 2,
    color: '#ff0000',
    fontSize: 14,
    backgroundColor: 'yellow',
    transform: [{ skewX: '-10deg' }],
    borderRadius: 4,
    margin: 1.5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    fontWeight: 'bold',
  },
  specialOfferProductPrice: {
    color: '#ff0000',
    fontSize: 13,
    fontWeight: 'bold',
    padding: 2,
    backgroundColor: 'yellow',
    margin: 1.5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  addCartButton: {
    marginRight: 10,
  },
  footer: {
    marginTop: 2,
    paddingTop: 2,
    borderTopWidth: 2,
    borderColor: theme.colors.encarte,
  },
  merelyIllustrativeImages: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  shelfLife: {
    padding: 2,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 13,
    fontWeight: 'bold',
  },
  socialNetworks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  facebook: { color: '#4267B2', marginLeft: 10 },
  instagram: { color: '#C13584', marginLeft: 10 },
  whatsapp: {
    color: '#fff',
    backgroundColor: '#128C7E',
    borderRadius: 10,
    marginLeft: 10,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 8,
    textTransform: 'uppercase',
  },
});
