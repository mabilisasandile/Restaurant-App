
cartReducer.js
const initialState = {
  items: [],
};
// const initialState = [];


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
