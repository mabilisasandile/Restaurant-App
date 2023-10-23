
//Products
getProduct: useLinkBuilder.query({
    query: (id) => `products/${id}`,
});

//Orders
createOrder: useLinkBuilder.mutation({
    query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
    }),
});

//Payments
createPaymentIntent: useLinkBuilder.mutation({
    query: (data) => ({
        url: 'payments/intents',
        method: 'POST',
        body: data,
    }),
});

export const {
    useGetProductQuery,
    useGetProductsQuery,
    useCreateOrderMutation,
    useGetOrderQuery,
    useCreatePaymentIntentMutation
} = apiSlice;