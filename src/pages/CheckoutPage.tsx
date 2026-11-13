import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../features/checkout/services/stripe';
import { CheckoutForm } from '../features/checkout/components/CheckoutForm';
import { ArrowLeft } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
}

export const CheckoutPage = ({ onBack }: CheckoutPageProps) => {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al catálogo</span>
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Finalizar Compra</h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm onSuccess={onBack} />
      </Elements>
    </main>
  );
};