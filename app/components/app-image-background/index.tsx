import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import ImageColors from 'react-native-image-colors'

export const AppImageBackground = (props) => {
  const { style, source, onLoadedMainColor, children } = props;
  const [imageSource, setImageSource] = useState(null);

  const _getImageColor = async () => {
    if (source) {
      const colors = await ImageColors.getColors(require('./placeholder-comic.jpg'))
      onLoadedMainColor(colors)
    }
  }

  const _onGuestPhotoLoadFailed = () => setImageSource(require('./placeholder-comic.jpg'))

  useEffect(() => {
    setImageSource(source)
    _getImageColor()
  }, []);

  return (
    <ImageBackground
      {...props}
      style={style}
      resizeMode='cover'
      source={imageSource}
      onError={_onGuestPhotoLoadFailed}
    >
      {children}
    </ImageBackground>
  )
}