import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../features/cart/store/useCartStore';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar = ({ onOpenCart }: NavbarProps) => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            StoreCraft
          </span>
        </div>

        {/* Botón Carrito */}
        <button
          onClick={onOpenCart}
          className="relative p-2.5 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors"
          aria-label="Ver carrito"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};