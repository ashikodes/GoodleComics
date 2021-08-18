import { StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { color } from "../../theme"

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.palette.white
  },

  scrollViewContentWrapper: {
    marginTop: getStatusBarHeight()
  },

  titleBarStyle: {
    marginTop: 30,
    marginHorizontal: 30,
    marginBottom: 20,
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

  headerTextUnderline: {
    backgroundColor: color.palette.appDarkPurple,
    width: 57,
    height: 4,
    borderRadius: 2
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
  }
})