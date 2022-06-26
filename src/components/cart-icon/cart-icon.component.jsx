import './cart-icon.style.scss';
import { ShoppingBagIcon } from "@heroicons/react/outline";

import { useSelector, useDispatch } from "react-redux";

import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIconComponent = () => {
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className="shopping-icon"/>
            <span className="item-count">{ cartCount }</span>
        </div>
    )
}

export default CartIconComponent;
