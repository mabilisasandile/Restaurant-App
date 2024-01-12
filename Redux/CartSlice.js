
const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, actions) => {
            // state.push({ ...actions.payload, quantity:1 });
            const isAvailable = state.find(
                (value) => value.name == actions.payload.name
            );
            if (isAvailable) {
                actions.payload["quantity"] + 1;
            } else {
                state.push({ ...actions.payload, quantity:1 });
            }       
        },          
        removeFromCart: (state, actions) => {
            try {
                const newList = state.filter(
                    (value) => value.name !== actions.payload.name
                );
                return (state - newList);
            } catch (error) {
                console.log("Remove from cart error:", error);
            }
            
        },
        // removeFromCart(state, action) {
        //     const nextCartItems = state.cartItems.filter(
        //         cartItems => cartItems.id !== action.payload.id
        //     )

        //     state.cartItems = nextCartItems;
        // },
        incrementQuantity: (state, actions) => {
            const isAvailable = state.find(
                (value) => value.name == actions.payload.name
            ); 
            if (isAvailable) {
                isAvailable.quantity++;
            } else {
                console.log("not available");
            }
        },
        decrementQuantity: (state, actions) => {
            const isAvailable = state.find(
                (value) => value.name == actions.payload.name
            );
            if (isAvailable.quantity == 1) {
                isAvailable.quantity = 1;
            } else {
                isAvailable.quantity--;
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;