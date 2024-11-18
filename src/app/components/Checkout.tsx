'use client'

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements, useStripe } from "@stripe/react-stripe-js"
import { useCartStore } from "@/store"
import { useEffect, useState } from "react"
import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
    const cartStore = useCartStore()
    const [clientSecret, setClientSecret] = useState('')

    // Hook do Stripe
    const stripe = useStripe() // Aqui acessamos o objeto Stripe do hook

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
            console.log("Payment Intent:", data.paymentIntent); // Verificando o pagamento
            cartStore.setPaymentIntent(data.paymentIntent.id)
            setClientSecret(data.paymentIntent.client_secret)
        })

    }, [cartStore, cartStore.cart, cartStore.paymentIntent])

    // Log para depuração
    useEffect(() => {
        console.log("Stripe Loaded:", stripe); // Deve mostrar o objeto Stripe se carregado corretamente
        console.log("Client Secret:", clientSecret); // Deve mostrar o clientSecret gerado
    }, [stripe, clientSecret]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'night',
            labels: 'floating'
        }
    }

    return (
        <>
            {clientSecret && stripe ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
            ) : (
                <div>
                    <h1>Carregando...</h1>
                </div>
            )}
        </>
    )
}
