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
    const [noItemsInCart, setNoItemsInCard] = useState(0);

    const addItemToCart = (product) => {
        setCartItems(
            addCartItem(cartItems, product)
        );
        setNoItemsInCard(noItemsInCart + 1);
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, noItemsInCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

};