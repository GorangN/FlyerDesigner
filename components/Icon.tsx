
import React from 'react';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

/**
 * Reusable icon component using the Tabler Icons collection from Iconify.
 * Uses <img> tags to avoid heavy JS icon libraries.
 */
export const Icon: React.FC<IconProps> = ({ 
  name, 
  color = "%23ffffff", 
  size = 20, 
  className = "" 
}) => {
  // Ensure the color is encoded properly if it's a hex starting with #
  const encodedColor = color.startsWith('#') ? color.replace('#', '%23') : color;
  
  return (
    <img 
      src={`https://api.iconify.design/tabler/${name}.svg?color=${encodedColor}`}
      alt={`${name} icon`}
      style={{ width: size, height: size }}
      className={`inline-block select-none ${className}`}
      loading="lazy"
    />
  );
};
