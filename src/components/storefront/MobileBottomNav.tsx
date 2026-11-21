import { NavLink } from 'react-router-dom';
import { Grid2X2, Home, ShoppingCart, Sparkles, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function MobileBottomNav() {
  const { itemCount, openCartDrawer } = useCart();

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors ${
      isActive ? 'text-[#6A11CB]' : 'text-[#6E5B85]'
    }`;

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-0 left-0 right-0 z-40 flex h-[62px] items-center justify-around border-t border-[#EBD8FF] bg-white/95 px-1 backdrop-blur-xl lg:hidden"
    >
      <NavLink to="/" end className={tabClass}>
        <Home className="h-5 w-5" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/shop" className={tabClass}>
        <Store className="h-5 w-5" />
        <span>Shop</span>
      </NavLink>

      <NavLink to="/customize" className={tabClass}>
        <Sparkles className="h-5 w-5 text-[#FF4D8D]" />
        <span>Customize</span>
      </NavLink>

      <NavLink to="/categories" className={tabClass}>
        <Grid2X2 className="h-5 w-5" />
        <span>Categories</span>
      </NavLink>

      <button
        type="button"
        onClick={openCartDrawer}
        className="relative flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-[#6A11CB]"
        aria-label={`Open cart (${itemCount} items)`}
      >
        <span className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF4D8D] px-1 font-mono text-[10px] font-bold tabular-nums text-white">
            {itemCount}
          </span>
        </span>
        <span>Cart</span>
      </button>
    </nav>
  );
}
