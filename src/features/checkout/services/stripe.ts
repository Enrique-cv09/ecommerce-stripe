import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';

if (!STRIPE_PUBLIC_KEY) {
  console.warn('Advertencia: No se encontró VITE_STRIPE_PUBLIC_KEY en el archivo .env');
}

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);