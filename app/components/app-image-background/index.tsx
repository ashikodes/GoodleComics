import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';

export const AppImageBackground = (props) => {
  const { style, source, children } = props;
  const [imageSource, setImageSource] = useState(null);

  const _onGuestPhotoLoadFailed = () => setImageSource(require('./placeholder-comic.jpg'))

  useEffect(() => {
    setImageSource(source)
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