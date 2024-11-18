'use client'

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useCartStore } from "@/store"
import { useEffect, useState } from "react"
import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
    const cartStore = useCartStore()
    const [clientSecret, setClientSecret] = useState('')

    // Busca o PaymentIntent e define o clientSecret
    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent
            })
        }).then((res) => res.json()).then((data) => {
            cartStore.setPaymentIntent(data.paymentIntent.id)
            setClientSecret(data.paymentIntent.client_secret)
        })

    }, [cartStore, cartStore.cart, cartStore.paymentIntent])

    // Log para depuração
    useEffect(() => {
        console.log("Stripe Loaded:", stripePromise); // Verificando o Stripe
        console.log("Client Secret:", clientSecret); // Verificando o clientSecret
    }, [clientSecret]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'night',
            labels: 'floating'
        }
    }

    return (
        <>
            {/* Verifica se o clientSecret foi carregado e se o Stripe está disponível */}
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
            )}
            {!clientSecret && (
                <div>
                    <h1>Carregando...</h1>
                </div>
            )}
        </>
    )
}
