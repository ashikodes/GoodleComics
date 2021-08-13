import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

import { StatusBar } from 'expo-status-bar';

export const AppTitleBarHeight = 56;

export default (props) => {
  const { 
    title = '', 
    contentContainerStyle = {}, 
    statusBarStyle = 'light', 
    color = '#000', 
    backgroundColor = '#fff', 
    leading, 
    trailing 
  } = props;

  return (
    <View style={{ backgroundColor }}>
      <StatusBar translucent style={statusBarStyle} />
      <View style={styles.statusBar} />
      <View style={contentContainerStyle}>
        <View style={styles.main}>
          <View style={styles.leadingWrapper}>
            {
              leading
                ? leading
                : <View />
            }
            {
              typeof (title) === 'string'
                ? <Text style={[styles.titleText, { color }]}>
                  {title}
                </Text>
                : title
            }
          </View>
          {
            trailing
              ? trailing
              : <View />
          }
        </View>
      </View>
    </View>
  );
};