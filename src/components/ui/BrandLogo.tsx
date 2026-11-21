import { useState } from 'react';
import { Gift } from 'lucide-react';
import { BRAND_ASSETS } from '../../config/appConfig';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function BrandLogo({ size = 'md', showTagline = false }: BrandLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const heightClass =
    size === 'sm' ? 'h-7' : size === 'lg' ? 'h-10' : 'h-8 sm:h-9';

  return (
    <span className="inline-flex flex-col items-start whitespace-nowrap shrink-0">
      {!imgFailed ? (
        <img
          src={BRAND_ASSETS.logo}
          alt="GiftKart"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className={`${heightClass} w-auto object-contain select-none`}
        />
      ) : (
        <span className="inline-flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl text-white"
            style={{ background: 'linear-gradient(135deg, #6A11CB 0%, #FF4D8D 100%)' }}
          >
            <Gift className="h-4 w-4" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-[#6A11CB]">
            Gift<span className="text-[#FF4D8D]">Kart</span>
          </span>
        </span>
      )}
      {showTagline && (
        <span className="mt-0.5 text-[10px] font-semibold tracking-wide text-[#6A11CB]/80">
          Har Gift Mein Ek Kahani.
        </span>
      )}
    </span>
  );
}
