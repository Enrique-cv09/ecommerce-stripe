import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';
import { getProductById } from '../api/productsApi';
import { useCartStore } from '../features/cart/store/useCartStore';
import { formatCurrency } from '../utils/formatCurrency';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto my-12 text-center py-8 bg-red-50 text-red-600 rounded-2xl border border-red-100">
        <p>{error || 'Producto no encontrado'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-sm font-semibold text-indigo-600 hover:underline"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la tienda</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        {/* Imagen Ampliada */}
        <div className="flex items-center justify-center p-8 bg-slate-50/50 rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Información Detallada */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center space-x-2 text-amber-500 text-sm font-semibold">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              <span>{product.rating.rate}</span>
              <span className="text-slate-400 font-normal">
                ({product.rating.count} opiniones de clientes)
              </span>
            </div>

            <div className="text-3xl font-black text-slate-900 pt-2">
              {formatCurrency(product.price)}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {product.description}
            </p>
          </div>

          {/* Garantías y Botón de Acción */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 mb-4">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>Envío rápido disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Garantía de devolución</span>
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Añadir al Carrito</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};