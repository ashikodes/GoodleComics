import { StyleSheet, Dimensions } from "react-native";
import { color } from '../../theme/color'
import { appTitleBarHeight } from '../../components/title-bar'

export default StyleSheet.create({
  backIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
    tintColor: color.palette.white
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    backgroundColor: color.palette.black,
    flex: 1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height - appTitleBarHeight,
  },
  background: {
    width: '100%',
    height: '100%'
  },
});