export const BRAND_ASSETS = {
  logo: '/assets/aistudio/GiftKart_Pink_and_Purple_Smile_Logo_49bea800.png',
  giftCartIllustration: '/assets/aistudio/Glossy_Pink_Gift_Delivery_Cart_ee9c8cec.png',
} as const;

export const STUDIO_MEDIA = {
  heroPersonalized: '/src/assets/images/hero_personalized_gifts_1795285052149.jpg',
  coffeeMug: '/src/assets/images/product_magic_mug_1795285112764.jpg',
  ledLamp: '/src/assets/images/product_led_lamp_1795285053467.jpg',
  photoFrame: '/src/assets/images/product_photo_frame_1795285052399.jpg',
  tshirtPrint: '/src/assets/images/product_tshirt_print_1795285052582.jpg',
  giftBox: '/src/assets/images/product_gift_box_1795285058123.jpg',
  cushionKeychain: '/src/assets/images/product_cushion_keychain_1795285051802.jpg',
  stationeryDecor: '/src/assets/images/product_stationery_decor_1795285052438.jpg',
} as const;

export const APP_CONFIG = {
  brandName: 'GiftKart',
  tagline: 'Har Gift Mein Ek Kahani.',
  currency: {
    code: 'INR' as const,
    symbol: '₹' as const,
    locale: 'en-IN' as const,
  },
  officialColors: {
    purple: '#6A11CB',
    pink: '#FF4D8D',
    lavender: '#EBD8FF',
    white: '#FFFFFF',
  },
  launchCities: ['Durgapur', 'Kolkata'] as const,
  demoNotice:
    'GiftKart is currently operating in Local Demo Mode. Orders are saved locally in browser storage; live payments (Cashfree) and cloud database/auth (Supabase) are prepared as unconnected interfaces.',
} as const;

export const OFFICIAL_OCCASIONS = [
  { id: 'occ-birthday', label: 'Birthday Gifts', tag: 'Birthday' as const, slug: 'birthday' },
  { id: 'occ-anniversary', label: 'Anniversary Gifts', tag: 'Anniversary' as const, slug: 'anniversary' },
  { id: 'occ-friendship', label: 'Friendship Gifts', tag: 'Friendship' as const, slug: 'friendship' },
  { id: 'occ-couple', label: 'Couple Gifts', tag: 'Couple' as const, slug: 'couple' },
  { id: 'occ-corporate', label: 'Corporate Gifts', tag: 'Corporate' as const, slug: 'corporate' },
  { id: 'occ-return', label: 'Return Gifts', tag: 'Return Gifts' as const, slug: 'return-gifts' },
  { id: 'occ-festival', label: 'Festival Gifts', tag: 'Festival' as const, slug: 'festival' },
  { id: 'occ-special', label: 'Special Occasion Gifts', tag: 'Special Occasion' as const, slug: 'special-occasion' },
] as const;
