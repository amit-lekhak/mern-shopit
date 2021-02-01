import { ADD_TO_CART, REMOVE_ITEM_CART } from "../constants/cartConstants";

const initialState1 = {
  cartItems: [],
};

export const cartReducer = (state = initialState1, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const doesItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (doesItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === doesItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

     case REMOVE_ITEM_CART:
         return {
             ...state,
             cartItems: state.cartItems.filter(i => i.product !== action.payload)
         } 

    default:
      return state;
  }
};
