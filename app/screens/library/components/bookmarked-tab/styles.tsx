import { StyleSheet } from "react-native";
import { color } from "../../../../theme"

export default StyleSheet.create({
  main: {
    flex: 1
  },

  itemTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color: color.palette.black
  },

  itemDesc: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 15,
    color: color.palette.black,
    marginTop: 5
  },

  listItemWrapper: {
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F9FBFB',
    flexDirection: 'row'
  },

  listItemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },

  listItemTitleZone: { 
    flex: 1, 
    marginHorizontal: 10 
  }
})