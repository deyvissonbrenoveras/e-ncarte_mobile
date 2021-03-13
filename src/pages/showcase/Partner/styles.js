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
  subtitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
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
  customizableField: {
    marginTop: 20,
    marginBottom: 50,
  },
});
