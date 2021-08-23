import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

export const ImageWithPlaceholder = (props) => {
  const { style, src } = props;
  const [imageSource, setImageSource] = useState(require('./placeholder-comic.jpg'));

  useEffect(() => {
    if (src)
      setImageSource(src)
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