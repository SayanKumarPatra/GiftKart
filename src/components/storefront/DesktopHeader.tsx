import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Heart,
  Home,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { useCategories } from '../../hooks/useStoreData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_OCCASIONS } from '../../config/appConfig';

interface DesktopHeaderProps {
  onOpenSearch: () => void;
}

export function DesktopHeader({ onOpenSearch }: DesktopHeaderProps) {
  const { data: categories } = useCategories();
  const { itemCount, wishlistIds, openCartDrawer } = useCart();
  const { customerAccount } = useAuth();
  const [openMenu, setOpenMenu] = useState<'shop' | 'customize' | 'occasions' | 'account' | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const primaryWithSubs = categories.filter((c) => c.subcategories.length > 0);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      onOpenSearch();
      return;
    }
    navigate(`/search?search=${encodeURIComponent(trimmed)}`);
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-150 ${
      isActive
        ? 'bg-gradient-to-r from-[#6A11CB] to-[#B5179E] text-white shadow-sm shadow-[#6A11CB]/25'
        : 'text-[#1E1035] hover:bg-[#F8F2FF] hover:text-[#6A11CB]'
    }`;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 hidden border-b border-[#EBD8FF]/90 bg-white/98 backdrop-blur-xl lg:block"
    >
      {/* ROW 1: Logo + Wide Pill Search Bar + Wishlist | Account ▾ | Cart */}
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between gap-6 px-6">
        {/* Left: Upright GiftKart Brand Logo */}
        <Link
          to="/"
          aria-label="GiftKart Home"
          className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A11CB]"
        >
          <BrandLogo size="md" showTagline />
        </Link>

        {/* Center: Full Rounded Search Bar with Vibrant Pink Search Button */}
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          className="flex flex-1 max-w-2xl items-center rounded-2xl border border-[#EBD8FF] bg-white p-1 pl-4 shadow-xs transition-all focus-within:border-[#6A11CB]/50 focus-within:ring-2 focus-within:ring-[#6A11CB]/15"
        >
          <label htmlFor="desktop-header-search" className="sr-only">
            Search GiftKart products
          </label>
          <input
            id="desktop-header-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for personalized gifts, mugs, t-shirts, photo frames..."
            className="w-full bg-transparent text-xs font-medium text-[#2B0B4E] placeholder:text-[#7B6496] focus:outline-none xl:text-[13px]"
          />
          <button
            type="submit"
            aria-label="Search gifts"
            className="flex h-9 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#FF1F7A] to-[#FF4D8D] text-white shadow-sm shadow-[#FF4D8D]/30 transition-transform hover:scale-[1.03]"
          >
            <Search className="h-4 w-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Right: Wishlist | Account ▾ | Cart */}
        <div className="flex shrink-0 items-center gap-3.5">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlistIds.length} items)`}
            className="group relative inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1E1035] transition-colors hover:text-[#FF4D8D]"
          >
            <span className="relative flex items-center justify-center">
              <Heart className="h-5 w-5 text-[#6A11CB] transition-colors group-hover:text-[#FF4D8D]" />
              {wishlistIds.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF4D8D] px-1 font-mono text-[9px] font-bold tabular-nums text-white">
                  {wishlistIds.length}
                </span>
              )}
            </span>
            <span>Wishlist</span>
          </Link>

          <span className="h-5 w-px bg-[#EBD8FF]" aria-hidden="true" />

          {/* Account Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('account')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              to="/account"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1E1035] transition-colors hover:text-[#6A11CB]"
            >
              <User className="h-5 w-5 text-[#6A11CB]" />
              <span className="max-w-[96px] truncate">
                {customerAccount ? customerAccount.fullName.split(' ')[0] : 'Account'}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#594A6B] transition-transform duration-150 ${
                  openMenu === 'account' ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {openMenu === 'account' && (
              <div className="absolute right-0 top-full z-50 w-52 pt-2.5">
                <div className="rounded-2xl border border-[#EBD8FF] bg-white p-2 shadow-xl shadow-[#6A11CB]/15">
                  {[
                    { label: customerAccount ? 'My Profile' : 'Sign In / Account', to: '/account' },
                    { label: 'My Demo Orders', to: '/my-orders' },
                    { label: 'Saved Addresses', to: '/addresses' },
                    { label: 'Track Order', to: '/track-order' },
                    { label: 'Admin Panel (/admin)', to: '/admin' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block rounded-xl px-3 py-2 text-xs font-semibold text-[#2B0B4E] transition-colors hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className="h-5 w-px bg-[#EBD8FF]" aria-hidden="true" />

          {/* Cart */}
          <button
            type="button"
            onClick={openCartDrawer}
            aria-label={`Shopping cart (${itemCount} items)`}
            className="group relative inline-flex items-center gap-2 pr-1 text-[13px] font-bold text-[#1E1035] transition-colors hover:text-[#6A11CB]"
          >
            <span className="relative flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-[#6A11CB]" />
            </span>
            <span className="relative">
              Cart
              <span className="absolute -right-2.5 -top-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#FF1F7A] px-1 font-mono text-[10px] font-bold tabular-nums text-white shadow-xs">
                {itemCount}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* ROW 2: Primary Navigation Bar (Home, Shop ▾, Customize ▾, Occasions ▾, Accessories, Best Sellers, Track Order, About Us) */}
      <div className="border-t border-[#F2E6FF] bg-white">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-[46px] max-w-7xl items-center justify-center gap-2 px-6 xl:gap-5"
        >
          <NavLink to="/" end className={navLinkClass}>
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </NavLink>

          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('shop')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6A11CB] to-[#B5179E] text-white shadow-sm shadow-[#6A11CB]/25'
                    : 'text-[#1E1035] hover:bg-[#F8F2FF] hover:text-[#6A11CB]'
                }`
              }
            >
              <span>Shop</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  openMenu === 'shop' ? 'rotate-180' : ''
                }`}
              />
            </NavLink>

            {openMenu === 'shop' && (
              <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2.5">
                <div className="rounded-3xl border border-[#EBD8FF] bg-white p-6 shadow-2xl shadow-[#6A11CB]/15">
                  <div className="grid grid-cols-3 gap-6">
                    {primaryWithSubs.map((cat) => (
                      <div key={cat.id}>
                        <Link
                          to={`/category/${cat.slug}`}
                          className="text-sm font-bold text-[#2B0B4E] transition-colors hover:text-[#6A11CB]"
                        >
                          {cat.name}
                        </Link>
                        <ul className="mt-2.5 space-y-1.5">
                          {cat.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                to={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                                className="block text-xs font-medium text-[#594A6B] transition-colors hover:text-[#FF4D8D]"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#EBD8FF] pt-3 text-xs">
                    <Link
                      to="/categories"
                      className="font-bold text-[#6A11CB] hover:text-[#FF4D8D]"
                    >
                      View All Categories →
                    </Link>
                    <Link
                      to="/customization-guide"
                      className="font-semibold text-[#FF4D8D] hover:underline"
                    >
                      Customization Guide
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Customize Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('customize')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <NavLink
              to="/customize"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6A11CB] to-[#B5179E] text-white shadow-sm shadow-[#6A11CB]/25'
                    : 'text-[#1E1035] hover:bg-[#F8F2FF] hover:text-[#6A11CB]'
                }`
              }
            >
              <span>Customize</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  openMenu === 'customize' ? 'rotate-180' : ''
                }`}
              />
            </NavLink>

            {openMenu === 'customize' && (
              <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2.5">
                <div className="rounded-2xl border border-[#EBD8FF] bg-white p-3 shadow-2xl shadow-[#6A11CB]/15">
                  <div className="space-y-1">
                    {[
                      { label: 'All Customizable Gifts', to: '/customize' },
                      { label: 'Custom Photo Mugs', to: '/category/coffee-mug' },
                      { label: 'Custom T-Shirt Prints', to: '/category/t-shirt-print' },
                      { label: 'Custom Photo Frames', to: '/category/photo-frame' },
                      { label: 'Customization Guide', to: '/customization-guide' },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block rounded-xl px-3 py-2 text-xs font-semibold text-[#2B0B4E] transition-colors hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Occasions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('occasions')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'occasions' ? null : 'occasions')}
              className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-bold text-[#1E1035] transition-colors hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
            >
              <span>Occasions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  openMenu === 'occasions' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openMenu === 'occasions' && (
              <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2.5">
                <div className="rounded-2xl border border-[#EBD8FF] bg-white p-3.5 shadow-2xl shadow-[#6A11CB]/15">
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-[#FF4D8D]">
                    Gifts for Every Occasion
                  </p>
                  <div className="mt-2 grid grid-cols-1 gap-0.5">
                    {OFFICIAL_OCCASIONS.map((occ) => (
                      <Link
                        key={occ.id}
                        to={`/shop?occasion=${encodeURIComponent(occ.tag)}`}
                        className="rounded-xl px-3 py-1.5 text-xs font-semibold text-[#2B0B4E] transition-colors hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
                      >
                        {occ.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/category/personalized-accessories" className={navLinkClass}>
            Accessories
          </NavLink>

          <NavLink to="/best-sellers" className={navLinkClass}>
            Best Sellers
          </NavLink>

          <NavLink to="/track-order" className={navLinkClass}>
            Track Order
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
