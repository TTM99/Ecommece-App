import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "USER_SIGNIN": {
      const userInformation = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(userInformation));
      return { ...state, user: { ...state.user, userInfo: action.payload } };
    }
    case "USER_SIGNOUT": {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      return {
        ...state,
        user: {
          ...state.user,
          userInfo: null,
        },
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    }
    case "SAVE_SHIPPING_ADDRESS": {
      const { fullName, address, city, postalCode, country } = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify({
          fullName,
          address,
          city,
          postalCode,
          country,
        })
      );
      return {
        ...state,
        cart: { ...state.cart, shippingAdress: action.payload },
      };
    }
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
