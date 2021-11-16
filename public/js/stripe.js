import axios from 'axios';
import Stripe from 'stripe';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JvlJDSArm6AHDr9eNu5VWwe2Sh5OBFf8HScaSnVN2Kt89kuFtAFKuS33XPVA43ouFLFXZFFO2Zj6U0963LpCKsd00MIvRAwJh'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
