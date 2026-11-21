import {
  BestSellersSection,
  CategoryShowcaseSection,
  HeroSliderSection,
  OccasionsSection,
  WhyChooseGiftKartSection,
} from '../../components/storefront/HomeSections';

export function HomePage() {
  return (
    <div className="bg-white">
      <HeroSliderSection />
      <OccasionsSection />
      <CategoryShowcaseSection />
      <BestSellersSection />
      <WhyChooseGiftKartSection />
    </div>
  );
}
