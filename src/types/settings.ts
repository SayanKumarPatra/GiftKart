import type { OccasionTag } from './catalog';

export interface DeliveryZone {
  id: string;
  name: string;
  state: string;
  chargeInr: number;
  freeDeliveryAboveInr: number;
  estimatedDays: string;
  isActive: boolean;
}

export type CouponDiscountType = 'PERCENTAGE' | 'FLAT_INR';

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: CouponDiscountType;
  value: number;
  minOrderInr: number;
  maxDiscountInr?: number;
  isActive: boolean;
  createdAt: string;
}

export interface StoreBanner {
  enabled: boolean;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HeroSlide {
  id: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  occasionTag?: OccasionTag;
  isActive: boolean;
  sortOrder: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currencyCode: 'INR';
  currencySymbol: '₹';
  supportEmail: string;
  supportPhone: string;
  serviceCitiesSummary: string;
  deliveryZones: DeliveryZone[];
  banner: StoreBanner;
  heroSlides: HeroSlide[];
}
