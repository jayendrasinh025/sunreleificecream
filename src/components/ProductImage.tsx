import React, { useState } from 'react';
import { IceCream } from 'lucide-react';

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  categoryLabel?: string;
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  categoryLabel,
  priority,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#FFF9F2] to-slate-100 rounded-2xl text-center border border-slate-200/80 select-none ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || 'Sun Relief Ice Cream Product'}
      >
        <div className="w-12 h-12 rounded-full bg-[#123B75]/10 flex items-center justify-center text-[#123B75] mb-2">
          <IceCream className="w-6 h-6 text-[#E94B35]" />
        </div>
        <span className="text-xs font-bold text-[#123B75] line-clamp-1">
          {fallbackTitle || alt || 'Sun Relief Ice Cream'}
        </span>
        {categoryLabel && (
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">
            {categoryLabel}
          </span>
        )}
        <span className="mt-2 text-[9px] font-semibold text-[#123B75] bg-[#F5C542]/40 px-2 py-0.5 rounded-full">
          Pure Dairy Goodness
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || fallbackTitle || 'Sun Relief Ice Cream Product'}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
