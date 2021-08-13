import React from 'react';
import { View, Platform, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-spinkit';
import styles from './styles';

export const LoadingOverlay = (props) => {
  const {
    show,
    showDarkBackground = true,
    color = 'white',
    size = 56,
    backgroundColor = 'rgba(0,0,0,0.4)',
    style = {}
  } = props;
  if (show)
    return (
      <View style={[styles.main, style, { backgroundColor: showDarkBackground ? backgroundColor : 'transparent' }]}>
        {
          Platform.OS === 'ios'
            ?
            <Spinner
              color={color}
              type="Arc"
              size={size}
            />
            :
            <ActivityIndicator
              size={size}
              color={color}
            />
        }
      </View>
    );
  else
    return null;
}