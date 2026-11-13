import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../../../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCheckout: () => void;
}

export const CartDrawer = ({ isOpen, onClose, onNavigateToCheckout }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Tu Carrito</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-contain rounded-md border p-1" 
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</h3>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {formatCurrency(item.price)}
                    </p>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded border hover:bg-gray-50 text-gray-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded border hover:bg-gray-50 text-gray-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-base font-bold text-gray-900">
                <span>Total:</span>
                <span>{formatCurrency(getTotalPrice())}</span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToCheckout();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Proceder al Pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-xs text-center text-gray-500 hover:text-red-500 py-1 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};