import { StyleSheet } from "react-native";
import { color } from '../../theme'

export default StyleSheet.create({
  main: {
    flex: 1
  },

  backIcon: {
    width: 35,
    height: 35,
    marginLeft: 15
  },

  comicMarkIcon: {
    width: 30,
    height: 30,
    marginLeft: 25,
    tintColor: color.palette.white
  },

  comicMarkIconMarked: {
    width: 30,
    height: 30,
    marginLeft: 25,
    tintColor: color.yellow
  },

  comicImageWrapper: {
    aspectRatio: 1,
    marginLeft: 20,
    marginRight: 20
  },

  comicImage: { 
    flex: 1, 
    borderRadius: 17 
  },

  comicTitleRatingAndPriceWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15
  },

  comicTitle: {
    fontSize: 25,
    color: color.palette.white,
    fontFamily: 'Poppins-Bold',
    lineHeight: 40
  },

  comicPrice: {
    fontSize: 23,
    color: color.palette.white,
    fontFamily: 'Poppins-Bold'
  },

  comicDescriptionWrapper: {
    marginVertical: 30,
    marginHorizontal: 20
  },

  comicDescriptionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: color.palette.white,
    marginBottom: 10
  },

  comicDescription: {
    fontSize: 14,
    color: color.palette.white,
    textAlign: 'justify',
    fontFamily: 'Quicksand-Medium',
  },

  bottomBtnsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flexDirection: 'row'
  },

  purchaseReadBtn: {
    height: 60,
    width: 200,
    backgroundColor: color.palette.appLightBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  purchaseReadBtnText: {
    color: color.palette.white,
    fontSize: 20,
    fontFamily: 'Quicksand-Bold'
  },

  background: {
    width: '100%',
    height: '100%'
  },

  backgroundDarkOverlay: { 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    position: 'absolute', 
    width: '100%', 
    height: '100%' 
  }
});