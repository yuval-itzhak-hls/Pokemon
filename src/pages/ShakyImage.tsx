import React from 'react';
import clsx from 'clsx';

interface ShakyImageProps {
  src: string;
  alt: string;
  shouldShake: boolean;
  className: string;
}

export const ShakyImage: React.FC<ShakyImageProps> = ({
  src,
  alt,
  shouldShake,
  className="",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={clsx(          
        className,
        shouldShake && 'animate-shake', 
      )}
    />
  );
};
