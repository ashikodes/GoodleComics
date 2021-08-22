import { StyleSheet } from "react-native";
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

  tabBarTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    color: color.palette.black
  },

  tabBarIndicator: {
    width: 43,
    height: 5,
    marginTop: 5,
    borderRadius: 5 / 2
  }
})