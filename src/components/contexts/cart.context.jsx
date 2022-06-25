import { createContext } from "react";

import { useReducer } from "react";

import { createAction } from "../../utils/firebase/reducer.utils";

export const CART_ACTION_TYPES = {
    UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

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

export const CartContext = createContext(INITIAL_STATE);

export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (product) => {
        const newCartItems = decrementCartItem(cartItems, product)
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (product) => {
        const newCartItems = removeCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total+cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total+(cartItem.quantity * cartItem.price), 0);

        const payload = {
            cartCount: newCartCount,
            cartTotal: newCartTotal,
            cartItems: newCartItems
        }

        dispatch(
            createAction(
                CART_ACTION_TYPES.UPDATE_CART_ITEMS,
                payload
            )
        );
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_IS_CART_OPEN,
                bool
            ));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,

        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,

        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

};