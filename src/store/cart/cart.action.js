import { CART_ACTION_TYPES } from "./cart.types";
import {createAction} from "../../utils/firebase/reducer.utils";

export const setIsCartOpen = (isCartOpen) => createAction(
    CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen
);

export const addItemToCart = (cartItems, product) => {
    const newCartItems = addCartItem(cartItems, product);
    return createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems
    );
}

export const removeItemFromCart = (cartItems, product) => {
    const newCartItems = decrementCartItem(cartItems, product)
    return createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems
    );
}

export const clearItemFromCart = (cartItems, product) => {
    const newCartItems = removeCartItem(cartItems, product);
    return createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems
    );
}

/*
HELPER FUNCTIONS
 */

const addCartItem = (cartItems, productToAdd) => {
    const productIndex = cartItems.findIndex((product) => (product.id === productToAdd.id));
    if (productIndex >= 0) {
        return cartItems.map((cartItem) => (
            cartItem.id === productToAdd.id)
            ?
            {...cartItem, quantity: cartItem.quantity + 1}
            :
            cartItem
        )
    }
    return [...cartItems, { ...productToAdd, quantity: 1}];
}

const decrementCartItem = (cartItems, productToDecrement) => {
    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === productToDecrement.id
    );

    if (existingItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== productToDecrement.id
        );
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToDecrement.id ?
            {...cartItem, quantity: cartItem.quantity-1} :
            cartItem
    )
}

const removeCartItem = (cartItems, productToDecrement) => {
    return cartItems.filter(
        (cartItem) => cartItem.id !== productToDecrement.id
    );
}