
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({        //create({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(),     //baseQuery: fetchBaseQuery({ baseUrl }), 
    endpoints: (builder) => ({
        //Products
        getProducts: builder.query({
            query: () => 'products',
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}`,
        }),
        //Orders
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'orders',
                method: 'POST',
                body: newOrder,
            }),
        }),
        getOrder: builder.query({
            query: (ref) => `orders/${ref}`,
        }),
        //Payments
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: 'payments/intents',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductsQuery,
    useCreateOrderMutation,
    useGetOrderQuery,
    useCreatePaymentIntentMutation
} = apiSlice;