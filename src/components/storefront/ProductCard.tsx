import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../../types';
import { ProductImage } from '../ui/ProductImage';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatInr } from '../../utils/format';

interface ProductCardProps {
  product: Product;
  categoryLabel?: string;
}

export function ProductCard({ product, categoryLabel }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted, openCartDrawer } = useCart();
  const { pushToast } = useToast();
  const saved = isWishlisted(product.id);

  const discountPct =
    product.compareAtPriceInr && product.compareAtPriceInr > product.priceInr
      ? Math.round(
          ((product.compareAtPriceInr - product.priceInr) / product.compareAtPriceInr) * 100
        )
      : 0;

  function handleAddToCart() {
    const defaultVariants: Record<string, string> = {};
    product.variants.forEach((group) => {
      if (group.options.length > 0) {
        defaultVariants[group.name] = group.options[0];
      }
    });
    addToCart(product, { quantity: 1, selectedVariants: defaultVariants });
    pushToast({
      title: 'Added to Cart',
      description: `${product.name} · ${formatInr(product.priceInr)}`,
      variant: 'success',
    });
    openCartDrawer();
  }

  return (
    <article className="gk-card gk-card-hover group flex h-full flex-col overflow-hidden rounded-2xl p-2.5 sm:p-3">
      {/* Studio Image Frame + Top-Right Circular Wishlist Toggle */}
      <div className="relative overflow-hidden rounded-xl">
        <Link to={`/product/${product.slug}`} className="block">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            aspectClass="aspect-[4/3]"
            zoomOnHover
          />
        </Link>

        <button
          type="button"
          onClick={() => {
            const added = toggleWishlist(product.id);
            pushToast({
              title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
              description: product.name,
              variant: 'info',
            });
          }}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/92 text-[#2B0B4E] shadow-sm transition-transform duration-150 hover:scale-105"
        >
          <Heart
            className={`h-4 w-4 ${
              saved ? 'fill-[#FF4D8D] text-[#FF4D8D]' : 'text-[#6A11CB]'
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-3 flex flex-1 flex-col justify-between px-0.5">
        <div>
          {categoryLabel && (
            <p className="truncate text-[11px] font-semibold text-[#6E5B85]">
              {categoryLabel}
            </p>
          )}

          <Link
            to={`/product/${product.slug}`}
            className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-[#2B0B4E] transition-colors hover:text-[#6A11CB]"
          >
            {product.name}
          </Link>

          {/* Rating shown ONLY when sample/review data exists, explicitly labeled as sample preview */}
          {product.sampleRating !== undefined && (
            <div className="mt-1.5 flex items-center gap-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono font-bold tabular-nums text-[#2B0B4E]">
                {product.sampleRating.toFixed(1)}
              </span>
              <span className="text-[11px] text-[#6E5B85]">
                (Sample{product.sampleReviewCount ? ` · ${product.sampleReviewCount}` : ''})
              </span>
            </div>
          )}

          {/* Price + Compare Price + Pink Discount Badge */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-base font-extrabold tabular-nums text-[#2B0B4E]">
              {formatInr(product.priceInr)}
            </span>
            {product.compareAtPriceInr && product.compareAtPriceInr > product.priceInr && (
              <span className="font-mono text-xs tabular-nums text-[#8B7AA0] line-through">
                {formatInr(product.compareAtPriceInr)}
              </span>
            )}
            {discountPct > 0 && (
              <span className="rounded-full bg-[#FF4D8D] px-2 py-0.5 font-mono text-[10px] font-bold tabular-nums text-white">
                -{discountPct}%
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stockCount <= 0}
          className="gk-btn-purple mt-3 flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          <span>{product.stockCount > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </article>
  );
}
