import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'collaborator_pro': 'price_1TmB9F6nkulkujdoaCEbljrb',
    'collaborator_premium': 'price_1TmC1r6nkulkujdovCdbJcez',
    'founder_growth': 'price_1TmC2V6nkulkujdo8l7RXxAB',
    'founder_enterprise': 'price_1TmC306nkulkujdoxOcVZnvf'
}