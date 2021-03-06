import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { color } from '../../theme'

export default StyleSheet.create({
  main: {
    flex: 1
  },

  backIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
    tintColor: color.palette.white
  },

  previewIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: color.palette.white
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
    width: '100%',
    height: '100%',
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
    textAlign: 'center',
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
    lineHeight: 23,
  },

  bottomBtnsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: getBottomSpace()
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
  },

  previewBtn: {
    backgroundColor: '#364f6b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  previewTextBtn: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 14,
    lineHeight: 15,
    color: color.palette.white
  }
});