import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { BRAND_ASSETS } from '../../config/appConfig';
import { useStoreSettings } from '../../hooks/useStoreData';

export function StorefrontFooter() {
  const { data: settings } = useStoreSettings();
  const activeZones =
    settings?.deliveryZones.filter((z) => z.isActive).map((z) => z.name) ?? [
      'Durgapur',
      'Kolkata',
    ];

  return (
    <footer className="gk-footer-gradient relative overflow-hidden border-t border-[#EBD8FF] pb-[62px] lg:pb-0">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand Logo + Tagline + Social Links */}
          <div className="lg:col-span-3">
            <Link to="/" aria-label="GiftKart Home">
              <BrandLogo size="md" showTagline />
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-[#594A6B]">
              Personalized coffee mugs, printed T-shirts, illuminated photo frames, and boutique gift wrapping — crafted with care.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {[
                { label: 'YouTube', Icon: Youtube, bg: 'bg-[#FF4D8D]/15 text-[#FF4D8D]' },
                { label: 'Instagram', Icon: Instagram, bg: 'bg-[#6A11CB]/12 text-[#6A11CB]' },
                { label: 'Facebook', Icon: Facebook, bg: 'bg-[#6A11CB]/12 text-[#6A11CB]' },
                { label: 'WhatsApp', Icon: MessageCircle, bg: 'bg-[#FF4D8D]/15 text-[#FF4D8D]' },
              ].map(({ label, Icon, bg }) => (
                <a
                  key={label}
                  href="#social-placeholder"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`GiftKart on ${label}`}
                  title={`${label} (Connect social link in Store Settings)`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 ${bg}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-extrabold text-[#2B0B4E]">Quick Links</h3>
            <ul className="mt-3.5 space-y-2 text-xs font-medium text-[#594A6B]">
              <li><Link to="/" className="hover:text-[#6A11CB]">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#6A11CB]">Shop</Link></li>
              <li><Link to="/customize" className="hover:text-[#6A11CB]">Customize</Link></li>
              <li><Link to="/categories" className="hover:text-[#6A11CB]">All 15 Categories</Link></li>
              <li><Link to="/best-sellers" className="hover:text-[#6A11CB]">Best Sellers</Link></li>
              <li><Link to="/track-order" className="hover:text-[#6A11CB]">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-extrabold text-[#2B0B4E]">Customer Support</h3>
            <ul className="mt-3.5 space-y-2 text-xs font-medium text-[#594A6B]">
              <li><Link to="/contact" className="hover:text-[#6A11CB]">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-[#6A11CB]">FAQ</Link></li>
              <li><Link to="/return-policy" className="hover:text-[#6A11CB]">Return Policy</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-[#6A11CB]">Shipping Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#6A11CB]">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: About GiftKart */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-extrabold text-[#2B0B4E]">About GiftKart</h3>
            <ul className="mt-3.5 space-y-2 text-xs font-medium text-[#594A6B]">
              <li><Link to="/about" className="hover:text-[#6A11CB]">About Us</Link></li>
              <li><Link to="/terms" className="hover:text-[#6A11CB]">Terms &amp; Conditions</Link></li>
              <li><Link to="/my-orders" className="hover:text-[#6A11CB]">My Orders</Link></li>
              <li>
                <Link to="/admin" className="font-bold text-[#6A11CB] hover:text-[#FF4D8D]">
                  Admin Panel (/admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Delivery Areas & Contact Placeholders */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold text-[#2B0B4E]">We Deliver to</h3>
            <ul className="mt-3.5 space-y-2 text-xs font-semibold text-[#2B0B4E]">
              {activeZones.map((zone) => (
                <li key={zone} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#FF4D8D]" />
                  <span>{zone}, West Bengal</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1.5 text-xs text-[#594A6B]">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#6A11CB]" />
                <span>{settings?.supportEmail ?? 'hello@giftkart.in'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#6A11CB]" />
                <span>{settings?.supportPhone ?? '+91 98300 00142'}</span>
              </p>
            </div>
            <img
              src={BRAND_ASSETS.giftCartIllustration}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="mt-4 hidden h-14 w-auto object-contain opacity-90 sm:block"
            />
          </div>
        </div>
      </div>

      {/* Subtle Bengal Bridge Silhouette Divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto max-w-7xl px-6 opacity-25"
      >
        <svg viewBox="0 0 1200 54" className="h-9 w-full text-[#6A11CB]" fill="none">
          <path
            d="M0 52 H760 L820 14 L880 52 H960 L1020 14 L1080 52 H1200"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M820 14 L850 52 M820 14 L790 52 M1020 14 L1050 52 M1020 14 L990 52 M820 18 Q920 44 1020 18"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Royal Purple Bottom Copyright Strip */}
      <div className="bg-[#6A11CB] px-4 py-3.5 text-center text-xs font-medium text-white">
        <p>
          © {new Date().getFullYear()} GiftKart. All Rights Reserved. &nbsp;|&nbsp; Har Gift Mein Ek Kahani. &nbsp;|&nbsp; Serving Durgapur &amp; Kolkata
        </p>
      </div>
    </footer>
  );
}
