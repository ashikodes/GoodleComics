import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  statusBar: {
    height: getStatusBarHeight()
  },

  main: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  titleText: {
    fontSize: 20,
    marginLeft: 15,
    color: 'white'
  },

  leadingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});