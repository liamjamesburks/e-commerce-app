import './cart-icon.style.scss';
import { ShoppingBagIcon } from "@heroicons/react/outline";

import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className="shopping-icon"/>
            <span className="item-count">10</span>
        </div>
    )
}

export default CartIcon;
