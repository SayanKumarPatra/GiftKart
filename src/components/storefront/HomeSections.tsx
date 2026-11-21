import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Crown,
  Flame,
  Gem,
  Gift,
  Headphones,
  Heart,
  HeartHandshake,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from 'lucide-react';
import { BRAND_ASSETS, OFFICIAL_OCCASIONS } from '../../config/appConfig';
import { useCategories, useProducts, useStoreSettings } from '../../hooks/useStoreData';
import { ProductCard } from './ProductCard';
import { ProductImage } from '../ui/ProductImage';

/* -------------------------------------------------------------------------- */
/* SECTION 2 — HERO SLIDING BANNER                                            */
/* -------------------------------------------------------------------------- */
export function HeroSliderSection() {
  const { data: settings } = useStoreSettings();
  const slides = (settings?.heroSlides ?? [])
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || paused) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  const current = slides[activeIndex] ?? slides[0];

  if (!current) {
    return null;
  }

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % slides.length);

  return (
    <section
      aria-label="Featured gifting promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="gk-hero-gradient relative overflow-hidden border-b border-[#EBD8FF]/80"
    >
      {/* Subtle decorative pastel bokeh circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#EBD8FF]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#FF4D8D]/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Bold Purple Headline + Pink Highlight + Shop Now CTA */}
          <div className="text-center lg:col-span-6 lg:text-left">
            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#3B0764] sm:text-5xl lg:text-[52px]">
              {current.titlePrefix}{' '}
              <span className="relative inline-block text-[#FF4D8D]">
                {current.titleHighlight}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 14"
                  className="mx-auto mt-1 h-2.5 w-full max-w-[220px] text-[#FF4D8D] lg:mx-0"
                  fill="none"
                >
                  <path
                    d="M4 10C58 2.5 148 2.5 216 9.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-4 text-sm font-semibold text-[#4B2C70] sm:text-base">
              {current.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                to={current.ctaHref}
                className="gk-btn-pink inline-flex min-h-[48px] items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all duration-150"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/customize"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#EBD8FF] bg-white/85 px-6 py-3 text-sm font-bold text-[#6A11CB] shadow-sm transition-colors hover:bg-white"
              >
                <span>Customize Now</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Studio Gift Showcase Photography */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl">
              <div className="overflow-hidden rounded-3xl border-4 border-white/85 bg-white shadow-xl shadow-[#6A11CB]/15">
                <ProductImage
                  src={current.imageUrl}
                  alt={`${current.titlePrefix} ${current.titleHighlight}`}
                  aspectClass="aspect-[4/3]"
                />
              </div>
              <img
                src={BRAND_ASSETS.giftCartIllustration}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute -bottom-5 -left-4 hidden h-20 w-auto object-contain drop-shadow-md sm:block"
              />
            </div>
          </div>
        </div>

        {/* Previous / Next Controls */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous banner slide"
              className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#6A11CB] shadow-md transition-transform hover:scale-105 hover:bg-white md:flex lg:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next banner slide"
              className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#6A11CB] shadow-md transition-transform hover:scale-105 hover:bg-white md:flex lg:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Slider Pagination Indicators */}
        {slides.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.titleHighlight}`}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  idx === activeIndex
                    ? 'w-7 bg-[#6A11CB]'
                    : 'w-2.5 bg-[#6A11CB]/25 hover:bg-[#FF4D8D]/60'
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
/* SECTION 3 — GIFTS FOR EVERY OCCASION                                       */
/* -------------------------------------------------------------------------- */
const OCCASION_ICON_MAP = {
  Birthday: { Icon: Gift, color: 'text-[#FF4D8D]' },
  Anniversary: { Icon: Heart, color: 'text-[#FF4D8D]' },
  Friendship: { Icon: Users, color: 'text-[#6A11CB]' },
  Couple: { Icon: HeartHandshake, color: 'text-[#FF4D8D]' },
  Corporate: { Icon: Briefcase, color: 'text-[#6A11CB]' },
  'Return Gifts': { Icon: PackageCheck, color: 'text-[#FF4D8D]' },
  Festival: { Icon: Flame, color: 'text-[#FF4D8D]' },
  'Special Occasion': { Icon: Sparkles, color: 'text-[#6A11CB]' },
} as const;

export function OccasionsSection() {
  return (
    <section
      aria-labelledby="occasions-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12"
    >
      <div className="flex items-center justify-center gap-4">
        <span className="hidden h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent to-[#EBD8FF] sm:block" />
        <h2
          id="occasions-heading"
          className="flex items-center gap-2 text-center text-2xl font-extrabold tracking-tight text-[#3B0764] sm:text-3xl"
        >
          <span>
            Gifts for Every <span className="text-[#FF4D8D]">Occasion</span>
          </span>
          <Heart className="h-6 w-6 text-[#FF4D8D]" strokeWidth={2.2} />
        </h2>
        <span className="hidden h-px flex-1 max-w-[140px] bg-gradient-to-l from-transparent to-[#EBD8FF] sm:block" />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8">
        {OFFICIAL_OCCASIONS.map((occ) => {
          const entry = OCCASION_ICON_MAP[occ.tag];
          const Icon = entry.Icon;
          return (
            <Link
              key={occ.id}
              to={`/shop?occasion=${encodeURIComponent(occ.tag)}`}
              className="gk-occasion-tile gk-card-hover flex flex-col items-center justify-center rounded-2xl px-3 py-5 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs">
                <Icon className={`h-6 w-6 ${entry.color}`} strokeWidth={1.9} />
              </div>
              <span className="mt-3 text-xs font-bold leading-snug text-[#2B0B4E]">
                {occ.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 4 — SHOP BY CATEGORY (OFFICIAL 15 CATEGORIES)                      */
/* -------------------------------------------------------------------------- */
export function CategoryShowcaseSection() {
  const { data: categories } = useCategories();
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <section
      aria-labelledby="category-showcase-heading"
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="category-showcase-heading"
            className="text-2xl font-extrabold tracking-tight text-[#3B0764] sm:text-3xl"
          >
            <span className="border-b-[3px] border-[#FF4D8D] pb-1">Shop</span> by Category
          </h2>
        </div>
        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#6A11CB] transition-colors hover:text-[#FF4D8D]"
        >
          <span>View All {categories.length} Categories</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {visibleCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="gk-card gk-card-hover group flex flex-col overflow-hidden rounded-2xl"
          >
            <div className="p-2 pb-0">
              <div className="overflow-hidden rounded-xl bg-gradient-to-b from-[#FFF0F6] to-[#F7ECFF]">
                <ProductImage
                  src={cat.imageUrl}
                  alt={cat.name}
                  aspectClass="aspect-square"
                  zoomOnHover
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center px-2 py-2.5 text-center">
              <span className="line-clamp-2 text-xs font-bold leading-snug text-[#2B0B4E] group-hover:text-[#6A11CB]">
                {cat.name}
              </span>
              {cat.subcategories.length > 0 && (
                <span className="mt-0.5 text-[10px] font-semibold text-[#FF4D8D]">
                  {cat.subcategories.length} styles
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {categories.length > 8 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#EBD8FF] bg-[#F8F2FF] px-6 py-2 text-xs font-bold text-[#6A11CB] transition-colors hover:bg-[#EBD8FF]/70"
          >
            <span>
              {showAll
                ? 'Show Featured 8 Categories'
                : `Show All ${categories.length} Official Categories`}
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 5 — OUR BEST SELLERS                                               */
/* -------------------------------------------------------------------------- */
export function BestSellersSection() {
  const { data: bestSellers } = useProducts({ bestSellersOnly: true });
  const { data: categories } = useCategories();
  const catMap = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <section
      aria-labelledby="best-sellers-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2
          id="best-sellers-heading"
          className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-[#3B0764] sm:text-3xl"
        >
          <Crown className="h-7 w-7 fill-amber-400 text-amber-500" />
          <span>Our Best Sellers</span>
        </h2>

        <Link
          to="/best-sellers"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#6A11CB] transition-colors hover:text-[#FF4D8D]"
        >
          <span>View More</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {bestSellers.slice(0, 5).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryLabel={catMap.get(product.categoryId)}
          />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 6 — WHY CHOOSE GIFTKART (WITH UPLOADED GIFT CART ILLUSTRATION)     */
/* -------------------------------------------------------------------------- */
export function WhyChooseGiftKartSection() {
  const pillars = [
    {
      Icon: Gem,
      title: 'Unique & Personalized',
      subtitle: 'Custom names, photos & boutique gift wrapping',
    },
    {
      Icon: Truck,
      title: 'Durgapur & Kolkata Delivery',
      subtitle: 'Dedicated dispatch across both launch cities',
    },
    {
      Icon: ShieldCheck,
      title: 'Transparent Shopping',
      subtitle: 'Demo Order mode (Cashfree ready — not connected)',
    },
    {
      Icon: Headphones,
      title: 'Dedicated Support',
      subtitle: 'Friendly help for custom gifts & special requests',
    },
  ];

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="gk-promo-gradient relative mt-6 overflow-hidden border-y border-[#EBD8FF]"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <h2
              id="why-choose-heading"
              className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#3B0764] sm:text-3xl"
            >
              <span>
                Why Choose <span className="text-[#FF4D8D]">GiftKart</span>?
              </span>
              <Heart className="h-5 w-5 text-[#FF4D8D]" />
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.Icon;
                return (
                  <div
                    key={pillar.title}
                    className={`flex flex-col items-start sm:items-center sm:text-center ${
                      idx > 0 ? 'lg:border-l lg:border-[#EBD8FF] lg:pl-5' : ''
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#6A11CB] shadow-sm shadow-[#6A11CB]/10">
                      <Icon className="h-6 w-6" strokeWidth={1.85} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-[#2B0B4E]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#594A6B]">
                      {pillar.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Uploaded Transparent Gift Cart Illustration */}
          <div className="flex justify-center lg:col-span-3 lg:justify-end">
            <img
              src={BRAND_ASSETS.giftCartIllustration}
              alt="GiftKart personalized gift delivery illustration"
              referrerPolicy="no-referrer"
              className="h-40 w-auto object-contain drop-shadow-lg sm:h-48"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
