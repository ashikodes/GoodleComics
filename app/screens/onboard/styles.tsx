import { StyleSheet, Platform } from "react-native";
import { color } from "../../theme"

export default StyleSheet.create({
  arrowIcon: {
    height: 46,
    width: 46,
  },

  button: {
    backgroundColor: color.darkBlue,
    height: 54,
    width: 54,
  },

  container: {
    backgroundColor: color.palette.black,
    flex: 1,
  },

  footer: {
    alignItems: 'flex-end',
    display: 'flex',
  },

  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  headerCircle: {
    backgroundColor: color.yellow,
    borderRadius: 10,
    height: 20,
    marginRight: 12,
    width: 20,
  },

  headerText: {
    fontFamily: Platform.select({
      ios: 'Inter-Black',
      android: 'Inter-Black',
    }),
    fontSize: 36,
  },

  image: {
    flex: 1,
  },

  opaque: {
    backgroundColor: color.opaque,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 71,
    paddingHorizontal: 42,
    paddingTop: 56,
  },

  text: {
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Medium',
    }),
    fontSize: 38,
    fontWeight: '600',
    lineHeight: 54,
  }
});