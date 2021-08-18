import { StyleSheet, Platform, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { color } from "../../theme"

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.palette.white
  },

  titleBarStyle: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30
  },

  searchBarStickyWrapper: {
    backgroundColor: color.palette.white
  },

  titleBarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },

  searchBarWrapper: {
    height: 50,
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.palette.veryLightGray
  },

  searchIcon: {
    width: 24,
    height: 24,
    tintColor: color.palette.black
  },

  searchBarText: {
    flex: 1,
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    color: color.palette.appGray
  },

  cardImage: {
    borderRadius: 8,
    height: 184,
    width: 150,
  },

  comicCard: {
    marginRight: 15,
    width: 150,
  },

  comicName: {
    color: color.palette.black,
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Medium',
    }),
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    paddingRight: 10,
  },

  comicsSection: {
    backgroundColor: color.palette.white,
    marginTop: 20,
    marginBottom: 20
  },

  container: {
    paddingBottom: 100,
    paddingLeft: 44,
  },

  headerImage: {
    borderRadius: 20,
    height: 40,
    marginRight: 20,
    width: 40,
  },

  headerProfile: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  headerText: {
    color: color.palette.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },

  listIcon: {
    height: 14,
    width: 20,
  },

  sectionHeader: {
    color: color.lightGray,
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
    marginBottom: 22,
    marginLeft: 30
  },

  comicHorizontalItemListContentContainerStyle: {
    paddingLeft: 30,
    paddingRight: 30
  },

  bigComic: {
    width: '100%',
    height: Dimensions.get('window').height * 2 / 3
  },

  bigComicInfoWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 20
  },

  bigComicInfoTitle: {
    color: color.palette.black,
    fontSize: 35,
    fontFamily: 'Poppins-Bold',
  },

  bigComicInfoDescShort: {
    color: color.palette.black,
    fontSize: 17,
    fontFamily: 'Poppins-Medium'
  },

  bigComicButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 20
  },

  bigComicButtonItem: {
    flex: 1,
    alignItems: 'center'
  },

  bigComicButtonItemIcon: {
    width: 25,
    height: 25,
    tintColor: 'black'
  },

  bigComicButtonItemText: {
    fontSize: 13,
    marginTop: 5,
    color: color.palette.black,
    fontFamily: 'Quicksand-Medium'
  },

  bigComicButtonItemTextRead: {
    fontSize: 13,
    marginTop: 5,
    color: color.palette.black,
    fontFamily: 'Quicksand-Bold'
  }
})