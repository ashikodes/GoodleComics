import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

export const ImageWithPlaceholder = (props) => {
  const { style, source } = props;
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    setImageSource(source)
  }, []);

  const _onGuestPhotoLoadFailed = () => setImageSource(require('./placeholder-comic.jpg'))

  return (
    <Image
      {...props}
      style={style}
      resizeMode='cover'
      source={imageSource}
      onError={_onGuestPhotoLoadFailed}
    />
  )
}