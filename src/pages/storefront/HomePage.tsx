import {
  BestSellersSection,
  CategoryShowcaseSection,
  HeroSliderSection,
  NewsletterSection,
  OccasionsSection,
  WhyChooseGiftKartSection,
} from '../../components/storefront/HomeSections';

export function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Sliding Banner (Clean Sleek Carousel — Desktop & Mobile) */}
      <HeroSliderSection />

      {/* Gifts for Every Occasion (Directly Below Hero Slider) */}
      <OccasionsSection />

      {/* Shop by Category (All 15 Official Categories) */}
      <CategoryShowcaseSection />

      {/* Our Best Sellers */}
      <BestSellersSection />

      {/* Why Choose GiftKart? (With Gift Cart Illustration) */}
      <WhyChooseGiftKartSection />

      {/* Stay Connected Newsletter (Demo Capture) */}
      <NewsletterSection />
    </div>
  );
}
