import { stripe } from "@/lib/stripe"
import { ProductType } from "@/types/ProductType"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

const calculateOrderAmount = (items: ProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price! * item.quantity!
    }, 0)
    return totalPrice
}

export async function POST(req: Request) {

    const { userId } = await auth()
    const { items, payment_intent_id } = await req.json()

    if (!userId) {
        return new Response("Unauthorized", { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
        where: { externalId: userId }
    })

    if (!currentUser) {
        return new Response("User not found", { status: 404 })
    }

    const total = calculateOrderAmount(items)

    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: 'brl',
        status: 'pending',
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            }))
        }
    }

    if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: total
            });

            // Encontre a ordem existente
            const existing_order = await prisma.order.findFirst({
                where: { paymentIntentID: payment_intent_id },
                include: { products: true }
            });

            if (existing_order) {
                // Exclua os produtos associados à ordem existente
                await prisma.product.deleteMany({
                    where: {
                        orders: {
                            some: {
                                id: existing_order.id
                            }
                        }
                    }
                });

                // Atualize a ordem com os novos produtos
                const updated_order = await prisma.order.update({
                    where: { paymentIntentID: payment_intent_id },
                    data: {
                        products: {
                            create: items.map((item: ProductType) => ({
                                name: item.name,
                                description: item.description,
                                quantity: item.quantity,
                                price: item.price,
                                image: item.image
                            }))
                        }
                    }
                });
                console.log('Updated Order:', updated_order)
            }

            if (!existing_order) {
                return new Response('Order not found!', { status: 404 })
            }

            return NextResponse.json({ paymentIntent: updated_intent }, { status: 200 })
        }
    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: 'brl',
            automatic_payment_methods: { enabled: true },
        })

        orderData.paymentIntentID = paymentIntent.id


        const newOrder = await prisma.order.create({
            data: orderData
        })
        console.log('New Order:', newOrder)


        const sendToPowerAutomate = async () => {
            const name = (currentUser.attributes as string)?.["first_name"] ?? "Cliente";
            const email = (currentUser.attributes as string)?.["email"] ?? "sem-email@exemplo.com";

            const product = items.map((item: ProductType) => item.name).join(", ");

            await fetch("https://prod-102.westus.logic.azure.com:443/workflows/11747c4a42cf4ea5969d6519b7261c2e/triggers/manual/paths/invoke?api-version=2016-06-01", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, product }),
            });

        };

        await sendToPowerAutomate();

        return NextResponse.json({ paymentIntent }, { status: 200 })
    }
} 