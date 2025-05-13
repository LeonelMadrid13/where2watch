'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface FallbackImageProps extends ImageProps {
  src: string;
  alt: string;
 }

const FallbackImageComponent: React.FC<FallbackImageProps> = ({ src, alt, ...props }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc('/no-image.png')}
    />
  );
}

export default FallbackImageComponent;