import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '../../cart/store/useCartStore';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Lock, CreditCard, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  onSuccess: () => void;
}

export const CheckoutForm = ({ onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { getTotalPrice, clearCart } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // Simulación de procesamiento de pago con Stripe Elements
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message || 'Ocurrió un error al procesar el pago.');
      setIsProcessing(false);
    } else {
      console.log('PaymentMethod creado exitosamente:', paymentMethod);
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-gray-900">¡Pago Exitoso!</h3>
        <p className="text-gray-600">
          Gracias por tu compra. Hemos procesado tu pedido correctamente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Detalles de la Tarjeta</h3>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Seguro SSL
          </span>
        </div>

        {/* Input seguro de Stripe para tarjeta */}
        <div className="p-3 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1f2937',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border">
        <span className="font-medium text-gray-700">Total a pagar:</span>
        <span className="text-xl font-bold text-gray-900">
          {formatCurrency(getTotalPrice())}
        </span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <span>Pagar {formatCurrency(getTotalPrice())}</span>
        )}
      </button>
    </form>
  );
};