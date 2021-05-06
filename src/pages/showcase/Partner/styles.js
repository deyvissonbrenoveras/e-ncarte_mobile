import { StyleSheet } from 'react-native';
import theme from '~/styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  partnerLogo: {
    height: 150,
    resizeMode: 'contain',
  },
  partnerName: {
    fontSize: 28,
    textAlign: 'center',
    height: 80,
    color: theme.colors.encarte,
    fontWeight: '400',
    marginTop: 15,
  },
  catalogSubtitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 8,
    margin: 2,
    textAlign: 'center',
  },
  site: {
    height: 25,
    borderWidth: 1,
    borderColor: theme.colors.greyBorder,
    borderRadius: 10,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
  },
  siteText: {
    // borderWidth: 1,
    marginLeft: 5,
  },
  socialNetworks: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    fontSize: 18,
    height: 64,
    borderWidth: 1,
    borderColor: theme.colors.greyBorder,
    borderRadius: 10,
    padding: 2,
  },
  facebook: { color: '#4267B2', marginLeft: 10 },
  instagram: { color: '#C13584', marginLeft: 10 },
  whatsapp: {
    color: '#fff',
    backgroundColor: '#128C7E',
    borderRadius: 10,
    marginLeft: 10,
  },
  featuredProductsList: {
    marginTop: 10,
  },
  customizableField: {
    marginTop: 10,
    minHeight: 300,
    elevation: 5,
  },
  featuredProductItem: {
    flex: 1 / 3,
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
  productModal: {
    flex: 1,
  },
  productModalContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  modalCloseButton: {
    marginLeft: 'auto',
  },
  productModalImage: {
    // width: '90%',
    // height: 60,
    height: 300,
    resizeMode: 'contain',
  },
  productModalName: {
    fontSize: 18,
    marginTop: 15,
    color: theme.colors.stoke,
    textAlign: 'center',
    marginBottom: 30,
  },
  productModalDescription: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'justify',
    color: '#000',
  },
  productModalStore: {
    marginBottom: 20,
  },
  productModalItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 1,
  },
  productModalStoreName: {
    textAlign: 'center',
    color: '#000',
  },
});
