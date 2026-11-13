import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../types/product';
import { useCartStore } from '../../cart/store/useCartStore';
import { formatCurrency } from '../../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between p-5">
      <div>
        {/* Click en la imagen para ir a detalle */}
        <div 
          onClick={() => navigate(`/product/${product.id}`)}
          className="relative h-48 w-full flex items-center justify-center p-3 mb-4 bg-slate-50/50 rounded-xl overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          {product.category}
        </span>

        {/* Click en el titulo para ir a detalle */}
        <h3 
          onClick={() => navigate(`/product/${product.id}`)}
          className="font-medium text-slate-800 mt-2.5 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer" 
          title={product.title}
        >
          {product.title}
        </h3>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xl font-extrabold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center space-x-1 text-xs text-amber-500 mt-0.5 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span>{product.rating.rate}</span>
            <span className="text-slate-400 font-normal">({product.rating.count})</span>
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white p-3 rounded-xl transition-all duration-200 shadow-md shadow-indigo-200 flex items-center justify-center"
          aria-label="Agregar al carrito"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};