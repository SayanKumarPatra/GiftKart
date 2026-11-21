import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Heart,
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
  const [openMenu, setOpenMenu] = useState<'shop' | 'occasions' | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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
  const otherCategories = categories.filter((c) => c.subcategories.length === 0);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 hidden border-b border-[#EBD8FF]/90 bg-white/94 backdrop-blur-xl lg:block"
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-6 px-6">
        {/* Left: Uploaded GiftKart Transparent Logo */}
        <Link
          to="/"
          aria-label="GiftKart Home"
          className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A11CB]"
        >
          <BrandLogo size="md" showTagline />
        </Link>

        {/* Center: Home, Shop dropdown, Customize, Occasions dropdown, Accessories */}
        <nav aria-label="Primary navigation" className="flex items-center gap-2 xl:gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#6A11CB] text-white shadow-sm shadow-[#6A11CB]/30'
                  : 'text-[#2B0B4E] hover:bg-[#F8F2FF] hover:text-[#6A11CB]'
              }`
            }
          >
            Home
          </NavLink>

          {/* Shop Dropdown (15 Official Categories + Exact Subcategories) */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('shop')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="flex items-center">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#6A11CB] text-white shadow-sm shadow-[#6A11CB]/30'
                      : 'text-[#2B0B4E] hover:bg-[#F8F2FF] hover:text-[#6A11CB]'
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
            </div>

            {openMenu === 'shop' && (
              <div className="absolute left-1/2 top-full z-50 w-[860px] -translate-x-1/2 pt-3">
                <div className="glass-surface-strong rounded-3xl p-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-7 grid grid-cols-3 gap-5 border-r border-[#EBD8FF] pr-5">
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

                    <div className="col-span-5 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#6A11CB]">
                          More Gift Categories ({categories.length} Official)
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                          {otherCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/category/${cat.slug}`}
                              className="truncate text-xs font-medium text-[#2B0B4E] transition-colors hover:text-[#FF4D8D]"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-[#EBD8FF] pt-3">
                        <Link
                          to="/categories"
                          className="text-xs font-bold text-[#6A11CB] hover:text-[#FF4D8D]"
                        >
                          View All 15 Categories →
                        </Link>
                        <Link
                          to="/best-sellers"
                          className="text-xs font-bold text-[#FF4D8D] hover:underline"
                        >
                          Best Sellers
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/customize"
            className={({ isActive }) =>
              `whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#6A11CB] text-white shadow-sm shadow-[#6A11CB]/30'
                  : 'text-[#2B0B4E] hover:bg-[#F8F2FF] hover:text-[#6A11CB]'
              }`
            }
          >
            Customize
          </NavLink>

          {/* Occasions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('occasions')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenMenu((prev) => (prev === 'occasions' ? null : 'occasions'))
              }
              aria-expanded={openMenu === 'occasions'}
              className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-[#2B0B4E] transition-all duration-150 hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
            >
              <span>Occasions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  openMenu === 'occasions' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openMenu === 'occasions' && (
              <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3">
                <div className="glass-surface-strong rounded-2xl p-3">
                  <ul className="space-y-1">
                    {OFFICIAL_OCCASIONS.map((occ) => (
                      <li key={occ.id}>
                        <Link
                          to={`/shop?occasion=${encodeURIComponent(occ.tag)}`}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#2B0B4E] transition-colors hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
                        >
                          <span>{occ.label}</span>
                          <span className="text-[#FF4D8D]">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/category/personalized-accessories"
            className={({ isActive }) =>
              `whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#6A11CB] text-white shadow-sm shadow-[#6A11CB]/30'
                  : 'text-[#2B0B4E] hover:bg-[#F8F2FF] hover:text-[#6A11CB]'
              }`
            }
          >
            Accessories
          </NavLink>
        </nav>

        {/* Right: Search icon, Wishlist icon, Cart icon with badge, Login / Account pill */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search gifts"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#2B0B4E] transition-colors hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
          >
            <Search className="h-5 w-5" strokeWidth={2.1} />
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlistIds.length} items)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#2B0B4E] transition-colors hover:bg-[#FFF0F6] hover:text-[#FF4D8D]"
          >
            <Heart className="h-5 w-5" strokeWidth={2.1} />
            {wishlistIds.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#FF4D8D] px-1 font-mono text-[10px] font-bold tabular-nums text-white shadow-sm">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={openCartDrawer}
            aria-label={`Open cart (${itemCount} items)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#2B0B4E] transition-colors hover:bg-[#F8F2FF] hover:text-[#6A11CB]"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2.1} />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#FF4D8D] px-1 font-mono text-[10px] font-bold tabular-nums text-white shadow-sm">
              {itemCount}
            </span>
          </button>

          <Link
            to="/account"
            className="ml-1 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#EBD8FF] bg-[#F8F2FF] px-4 py-1.5 text-sm font-semibold text-[#2B0B4E] transition-all duration-150 hover:border-[#6A11CB]/40 hover:bg-[#EBD8FF]/70 whitespace-nowrap shrink-0"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#6A11CB] shadow-xs">
              <User className="h-3.5 w-3.5" />
            </span>
            <span>
              {customerAccount ? customerAccount.fullName.split(' ')[0] : 'Login'}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
