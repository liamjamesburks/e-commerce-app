import { createContext, useState } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: () => {},
    noItemsInCart: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [noItemsInCart, setNoItemsInCart] = useState(0);

    const addItemToCart = (product) => {
        setCartItems(
            addCartItem(cartItems, product)
        );
        setNoItemsInCart(noItemsInCart + 1);
    }

    const removeItemFromCart = (product) => {
        setCartItems(
            decrementCartItem(cartItems, product)
        );
        setNoItemsInCart(noItemsInCart - 1);
    }

    const clearItemFromCart = (product) => {
        setCartItems(
            removeCartItem(cartItems, product)
        )
        setNoItemsInCart(noItemsInCart-product.quantity);
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, noItemsInCart, removeItemFromCart, clearItemFromCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

};