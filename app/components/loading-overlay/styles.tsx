import { StyleSheet, Platform, Dimensions } from 'react-native';

export default StyleSheet.create({
  main: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  }
});