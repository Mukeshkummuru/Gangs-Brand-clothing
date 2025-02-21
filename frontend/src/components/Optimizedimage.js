import React from 'react';

const OptimizedImage = ({ src, alt, width, height }) => {
    const webpSrc = src.replace('.jpg', '.webp');
    
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img 
          src={src}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
        />
      </picture>
    );
  };
export default OptimizedImage;