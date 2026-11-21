import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Gem,
  Headphones,
  Heart,
  Mail,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { BRAND_ASSETS, OFFICIAL_OCCASIONS } from '../../config/appConfig';
import { useCategories, useProducts, useStoreSettings } from '../../hooks/useStoreData';
import { services } from '../../services/registry';
import { useToast } from '../../context/ToastContext';
import { ProductCard } from './ProductCard';
import { ProductImage } from '../ui/ProductImage';

/* -------------------------------------------------------------------------- */
/* HERO SLIDING BANNER (PURE SMOOTH SLIDER — NO OVERLAY BUTTONS OR LINKS)     */
/* -------------------------------------------------------------------------- */
export function HeroSliderSection() {
  const { data: settings } = useStoreSettings();
  const slides = (settings?.heroSlides ?? [])
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const [activeIndex, setActiveIndex] = useState(0);
  const [resetTick, setResetTick] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const slideCount = slides.length;
  const safeIndex = slideCount > 0 ? activeIndex % slideCount : 0;

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [slideCount, resetTick]);

  if (slideCount === 0) {
    return null;
  }

  function jumpToSlide(idx: number) {
    setActiveIndex(idx);
    setResetTick((t) => t + 1);
  }

  function handleTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        jumpToSlide((safeIndex + 1) % slideCount);
      } else {
        jumpToSlide((safeIndex - 1 + slideCount) % slideCount);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }

  return (
    <section
      aria-label="Featured GiftKart sliding banners"
      className="w-full"
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-[160px] w-full overflow-hidden sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[390px]"
      >
        {/* GPU-Accelerated Continuous Horizontal Track (All Slides Pre-Mounted) */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translate3d(-${safeIndex * 100}%, 0, 0)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="h-full w-full shrink-0">
              <img
                src={slide.imageUrl}
                alt={`${slide.titlePrefix} ${slide.titleHighlight}`}
                loading="eager"
                decoding="async"
                draggable={false}
                referrerPolicy="no-referrer"
                className="h-full w-full select-none object-cover object-[center_53%]"
              />
            </div>
          ))}
        </div>

        {/* Minimal Slide Indicators Only — Zero Overlay Buttons or Links */}
        {slideCount > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 backdrop-blur-sm sm:bottom-3 sm:gap-2 sm:px-3">
            {slides.map((slide, idx) => (
              <span
                key={slide.id}
                role="presentation"
                onClick={() => jumpToSlide(idx)}
                className={`block cursor-pointer rounded-full transition-all duration-300 ${
                  idx === safeIndex
                    ? 'h-1.5 w-5 bg-[#6A11CB] sm:h-2 sm:w-6'
                    : 'h-1.5 w-1.5 bg-[#6A11CB]/30 hover:bg-[#FF4D8D]/70 sm:h-2 sm:w-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* GIFTS FOR EVERY OCCASION (BORDERLESS SOFT PASTEL TILES — SWIPE ON MOBILE)  */
/* -------------------------------------------------------------------------- */
const OCCASION_TILE_GRADIENTS = [
  'bg-gradient-to-br from-[#F9ECFF] to-[#F0D9FF]',
  'bg-gradient-to-br from-[#FFF0F6] to-[#FFDCEB]',
  'bg-gradient-to-br from-[#F5EAFF] to-[#E9D2FF]',
  'bg-gradient-to-br from-[#FFF2F8] to-[#F9DFF0]',
  'bg-gradient-to-br from-[#F6EEFF] to-[#EBD8FF]',
  'bg-gradient-to-br from-[#FFF3F6] to-[#FFE2EE]',
  'bg-gradient-to-br from-[#F8ECFF] to-[#EED7FF]',
  'bg-gradient-to-br from-[#FFF0F7] to-[#FADCEB]',
] as const;

export function OccasionsSection() {
  return (
    <section
      aria-labelledby="occasions-heading"
      className="mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h2
          id="occasions-heading"
          className="flex items-center gap-1.5 text-base font-extrabold tracking-tight text-[#2B0B4E] sm:text-2xl"
        >
          <span>Gifts for Every</span>
          <span className="text-[#FF4D8D]">Occasion</span>
          <Heart className="h-4 w-4 fill-[#FF4D8D]/20 text-[#FF4D8D] sm:h-5 sm:w-5" />
        </h2>

        {/* Mobile: Non-clickable swipe cue (tapping does nothing; users swipe with finger) */}
        <span
          aria-hidden="true"
          className="pointer-events-none inline-flex shrink-0 select-none items-center gap-0.5 text-[11px] font-bold text-[#6A11CB]/75 lg:hidden"
        >
          <span>View All</span>
          <ArrowRight className="h-3 w-3" />
        </span>

        {/* Desktop: Interactive View All link */}
        <Link
          to="/shop"
          className="hidden shrink-0 items-center gap-1 text-sm font-bold text-[#6A11CB] transition-colors hover:text-[#FF4D8D] lg:inline-flex"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* MOBILE & TABLET: Compact Borderless Pastel Squircle Tiles (Finger Swipe Strip) */}
      <div className="no-scrollbar mt-2.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-0.5 lg:hidden">
        {OFFICIAL_OCCASIONS.map((occ, idx) => (
          <Link
            key={occ.id}
            to={`/shop?occasion=${encodeURIComponent(occ.tag)}`}
            className="group flex w-[74px] shrink-0 snap-start flex-col items-center text-center sm:w-[86px]"
          >
            <div
              className={`flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-2xl p-0.5 shadow-xs shadow-[#6A11CB]/8 transition-transform duration-150 group-active:scale-95 sm:h-[82px] sm:w-[82px] sm:p-1 ${
                OCCASION_TILE_GRADIENTS[idx % OCCASION_TILE_GRADIENTS.length]
              }`}
            >
              <img
                src={occ.iconUrl}
                alt={occ.label}
                loading="eager"
                referrerPolicy="no-referrer"
                className="h-full w-full scale-[1.14] object-contain drop-shadow-xs"
              />
            </div>
            <span className="mt-1.5 line-clamp-2 text-[10px] font-bold leading-tight text-[#2B0B4E] group-hover:text-[#6A11CB] sm:text-[11px]">
              {occ.label}
            </span>
          </Link>
        ))}
      </div>

      {/* DESKTOP: Clean Borderless Pastel Squircle Row (8 Columns) */}
      <div className="mt-3.5 hidden grid-cols-8 gap-3 lg:grid">
        {OFFICIAL_OCCASIONS.map((occ, idx) => (
          <Link
            key={occ.id}
            to={`/shop?occasion=${encodeURIComponent(occ.tag)}`}
            className="group flex flex-col items-center text-center"
          >
            <div
              className={`flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-2xl p-1 shadow-xs shadow-[#6A11CB]/10 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md xl:h-[94px] xl:w-[94px] ${
                OCCASION_TILE_GRADIENTS[idx % OCCASION_TILE_GRADIENTS.length]
              }`}
            >
              <img
                src={occ.iconUrl}
                alt={occ.label}
                loading="eager"
                referrerPolicy="no-referrer"
                className="h-full w-full scale-[1.14] object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-[1.2]"
              />
            </div>
            <span className="mt-2 line-clamp-2 text-xs font-bold leading-snug text-[#2B0B4E] group-hover:text-[#6A11CB]">
              {occ.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SHOP BY CATEGORY (8x2 REFERENCE GRID + 16TH LAVENDER VIEW ALL CARD)        */
/* -------------------------------------------------------------------------- */
export function CategoryShowcaseSection() {
  const { data: categories, isLoading } = useCategories();

  return (
    <section
      aria-labelledby="categories-heading"
      className="mx-auto max-w-7xl px-3 pb-5 sm:px-5 sm:pb-7 lg:px-6"
    >
      <div className="flex items-end justify-between gap-2">
        <div>
          <h2
            id="categories-heading"
            className="text-base font-extrabold tracking-tight text-[#2B0B4E] sm:text-2xl"
          >
            Shop by Category
          </h2>
          <div className="mt-1 h-1 w-14 rounded-full bg-gradient-to-r from-[#6A11CB] to-[#FF4D8D] sm:w-16" />
        </div>

        <Link
          to="/categories"
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#6A11CB] transition-colors hover:text-[#FF4D8D] sm:text-sm lg:hidden"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5 lg:grid-cols-8">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div key={idx} className="h-32 animate-pulse rounded-2xl bg-[#F4EBFF]" />
          ))}
        </div>
      ) : (
        <>
          {/* MOBILE & TABLET HORIZONTAL SNAP-SCROLL STRIP (< 1024px) */}
          <div className="no-scrollbar mt-2.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1.5 lg:hidden">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group flex w-[104px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white text-center shadow-[0_6px_16px_-6px_rgba(106,17,203,0.16)] ring-1 ring-[#EBD8FF]/55 transition-transform duration-150 active:scale-[0.98] sm:w-[118px]"
              >
                <div className="h-[76px] w-full overflow-hidden bg-gradient-to-b from-[#FFEAF3] to-[#FFF4F9] sm:h-[86px]">
                  <ProductImage
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-h-[38px] flex-1 items-center justify-center bg-white px-1.5 py-1.5 sm:min-h-[42px]">
                  <span className="line-clamp-2 text-[10.5px] font-extrabold leading-[1.2] text-[#1E1035] group-hover:text-[#6A11CB] sm:text-[11px]">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}

            {/* 16th Card: View All 15 Categories (Mobile Strip End Tile) */}
            <Link
              to="/categories"
              className="group flex w-[104px] shrink-0 snap-start flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#F4E7FF] via-[#F1E0FF] to-[#EBD4FF] p-2.5 text-center shadow-[0_6px_16px_-6px_rgba(106,17,203,0.16)] ring-1 ring-[#EBD8FF]/65 transition-transform duration-150 active:scale-[0.98] sm:w-[118px]"
            >
              <span
                aria-hidden="true"
                className="mb-2 grid grid-cols-2 gap-1.5"
              >
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#D29EFF] to-[#B76EFF]" />
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#D29EFF] to-[#B76EFF]" />
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#D29EFF] to-[#B76EFF]" />
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#D29EFF] to-[#B76EFF]" />
              </span>
              <span className="text-[10.5px] font-extrabold leading-[1.25] text-[#1E1035] group-hover:text-[#6A11CB] sm:text-[11px]">
                View All
                <br />
                {categories.length} Categories
              </span>
            </Link>
          </div>

          {/* DESKTOP 8×2 GRID: ALL 15 OFFICIAL CATEGORIES + 16TH VIEW ALL TILE (>= 1024px) */}
          <div className="mt-3.5 hidden grid-cols-8 gap-2.5 lg:grid xl:gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white text-center shadow-[0_6px_18px_-6px_rgba(106,17,203,0.16)] ring-1 ring-[#EBD8FF]/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(106,17,203,0.24)] hover:ring-[#6A11CB]/30"
              >
                <div className="h-[80px] w-full overflow-hidden bg-gradient-to-b from-[#FFEAF3] to-[#FFF4F9] xl:h-[90px]">
                  <ProductImage
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-h-[42px] flex-1 items-center justify-center bg-white px-1.5 py-2 xl:min-h-[46px]">
                  <span className="line-clamp-2 text-[11px] font-extrabold leading-[1.2] text-[#1E1035] group-hover:text-[#6A11CB] xl:text-[12px]">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}

            {/* 16th Card: View All 15 Categories (Soft Lavender Reference Tile) */}
            <Link
              to="/categories"
              className="group flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#F4E7FF] via-[#F1E0FF] to-[#EBD4FF] p-3 text-center shadow-[0_6px_18px_-6px_rgba(106,17,203,0.16)] ring-1 ring-[#EBD8FF]/65 transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EFE0FF] hover:to-[#E2C2FF] hover:shadow-[0_12px_24px_-8px_rgba(106,17,203,0.24)]"
            >
              <span
                aria-hidden="true"
                className="mb-2.5 grid grid-cols-2 gap-1.5 transition-transform duration-200 group-hover:scale-105"
              >
                <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#D39EFF] to-[#B76EFF] shadow-2xs xl:h-[18px] xl:w-[18px]" />
                <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#D39EFF] to-[#B76EFF] shadow-2xs xl:h-[18px] xl:w-[18px]" />
                <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#D39EFF] to-[#B76EFF] shadow-2xs xl:h-[18px] xl:w-[18px]" />
                <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#D39EFF] to-[#B76EFF] shadow-2xs xl:h-[18px] xl:w-[18px]" />
              </span>
              <span className="text-[11px] font-extrabold leading-[1.25] text-[#1E1035] group-hover:text-[#6A11CB] xl:text-[12px]">
                View All
                <br />
                {categories.length} Categories
              </span>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OUR BEST SELLERS                                                           */
/* -------------------------------------------------------------------------- */
export function BestSellersSection() {
  const { data: products, isLoading } = useProducts({ bestSellersOnly: true });

  return (
    <section
      aria-labelledby="bestsellers-heading"
      className="mx-auto max-w-7xl px-3 pb-5 sm:px-5 sm:pb-7 lg:px-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#FFF0F6] text-[#FF4D8D] sm:h-8 sm:w-8">
            <Crown className="h-4 w-4" />
          </span>
          <div>
            <h2
              id="bestsellers-heading"
              className="text-lg font-extrabold tracking-tight text-[#2B0B4E] sm:text-2xl"
            >
              Our Best Sellers
            </h2>
            <p className="text-[11px] font-medium text-[#7B6496]">
              Demo catalog items · Ratings shown are sample preview data
            </p>
          </div>
        </div>

        <Link
          to="/best-sellers"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#6A11CB] transition-colors hover:text-[#FF4D8D] sm:text-sm"
        >
          <span>View More</span>
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-64 animate-pulse rounded-2xl bg-[#F4EBFF]" />
          ))}
        </div>
      ) : (
        <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHY CHOOSE GIFTKART? (WITH UPLOADED GIFT CART ILLUSTRATION)                */
/* -------------------------------------------------------------------------- */
export function WhyChooseGiftKartSection() {
  const pillars = [
    {
      title: 'Unique & Personalized Gifts',
      subtitle: 'Custom photos, names & gift wrap',
      Icon: Gem,
    },
    {
      title: 'Delivery in Jalchak',
      subtitle: 'Dedicated West Bengal zone',
      Icon: Truck,
    },
    {
      title: 'Reliable Shopping Experience',
      subtitle: 'Transparent Demo Order snapshots',
      Icon: ShieldCheck,
    },
    {
      title: 'Customer Support',
      subtitle: 'Friendly local gift assistance',
      Icon: Headphones,
    },
  ];

  return (
    <section
      aria-labelledby="why-giftkart-heading"
      className="mx-auto max-w-7xl px-3 pb-5 sm:px-5 sm:pb-7 lg:px-6"
    >
      <div className="gk-why-gradient relative overflow-hidden rounded-2xl border border-[#EBD8FF] px-4 py-5 shadow-sm sm:rounded-3xl sm:px-7 sm:py-6">
        <div className="grid items-center gap-5 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <h2
              id="why-giftkart-heading"
              className="flex flex-wrap items-center justify-center gap-1.5 text-center text-xl font-extrabold tracking-tight text-[#2B0B4E] sm:text-2xl lg:justify-start lg:text-left"
            >
              <span>Why Choose</span>
              <span className="text-[#FF4D8D]">GiftKart?</span>
              <Heart className="h-5 w-5 fill-[#FF4D8D]/20 text-[#FF4D8D]" />
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3.5">
              {pillars.map(({ title, subtitle, Icon }) => (
                <div
                  key={title}
                  className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/85 p-3 text-center backdrop-blur-sm sm:p-3.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EBFF] text-[#6A11CB]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-2 text-xs font-extrabold text-[#2B0B4E] sm:text-sm">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium leading-snug text-[#594A6B]">
                    {subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-3">
            <img
              src={BRAND_ASSETS.giftCartIllustration}
              alt="GiftKart pink and purple gift delivery cart illustration"
              referrerPolicy="no-referrer"
              className="h-28 w-auto max-w-full object-contain drop-shadow-xl sm:h-32 lg:h-36"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* STAY CONNECTED NEWSLETTER (DEMO LOCAL CAPTURE)                             */
/* -------------------------------------------------------------------------- */
export function NewsletterSection() {
  const { data: settings } = useStoreSettings();
  const { pushToast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const newsletter = settings?.newsletter;
  if (newsletter && !newsletter.enabled) {
    return null;
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    const result = await services.community.subscribeNewsletter(trimmed);
    setSubscribedEmail(result.subscriber.email);
    setEmail('');
    pushToast({
      title: result.added ? 'Saved to Demo Newsletter List' : 'Already on Demo List',
      description:
        'Saved locally in browser storage. No live marketing emails are sent until mailing integration is connected.',
      variant: 'success',
    });
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="mx-auto max-w-7xl px-3 pb-5 sm:px-5 sm:pb-7 lg:px-6"
    >
      <div className="overflow-hidden rounded-2xl border border-[#EBD8FF] bg-gradient-to-r from-[#F6ECFF] via-[#FFF4FA] to-[#FFFFFF] shadow-sm sm:rounded-3xl">
        <div className="grid items-center gap-4 lg:grid-cols-12">
          <div className="p-4 sm:p-6 lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#6A11CB] shadow-xs">
              <Mail className="h-3.5 w-3.5 text-[#FF4D8D]" />
              <span>Gift Ideas &amp; Collection Updates</span>
            </span>

            <h2
              id="newsletter-heading"
              className="mt-2.5 text-xl font-extrabold tracking-tight text-[#2B0B4E] sm:text-2xl"
            >
              {newsletter?.heading ?? 'Stay Connected with GiftKart'}
            </h2>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#594A6B] sm:text-sm">
              {newsletter?.description ??
                'Get new personalized gift ideas, seasonal collections, and launch announcements for Jalchak.'}
            </p>

            {subscribedEmail ? (
              <div className="mt-3.5 flex items-start gap-2.5 rounded-2xl border border-[#6A11CB]/25 bg-white p-3.5 text-xs text-[#2B0B4E]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6A11CB]" />
                <div>
                  <p className="font-bold">
                    Demo subscription recorded for {subscribedEmail}
                  </p>
                  <p className="mt-0.5 text-[#594A6B]">
                    Stored locally in Demo Mode. Real email delivery will begin only after an email provider integration is connected.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => void handleSubscribe(e)}
                noValidate
                className="mt-3.5 flex flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-1 items-center gap-2 rounded-full border border-[#EBD8FF] bg-white px-4 py-2 shadow-xs focus-within:border-[#6A11CB]">
                  <Mail className="h-4 w-4 shrink-0 text-[#6A11CB]" />
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm text-[#2B0B4E] placeholder:text-[#7B6496] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="gk-btn-pink inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold"
                >
                  <span>{newsletter?.buttonLabel ?? 'Subscribe'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {error && (
              <p className="mt-1.5 text-xs font-semibold text-rose-600">{error}</p>
            )}

            <p className="mt-2.5 text-[11px] text-[#7B6496]">
              Demo capture only — Email Notifications service is currently{' '}
              <span className="font-semibold text-[#6A11CB]">
                Integration Ready — Not Connected
              </span>
              .
            </p>
          </div>

          <div className="hidden h-full lg:col-span-5 lg:block">
            <img
              src={BRAND_ASSETS.newsletterBanner}
              alt="Stay Connected with GiftKart newsletter illustration"
              referrerPolicy="no-referrer"
              className="h-full max-h-[235px] w-full object-cover object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
