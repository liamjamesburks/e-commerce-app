import './checkout-item.style.scss';

import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { removeItemFromCart, addItemToCart, clearItemFromCart } from "../../store/cart/cart.action";

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity } = cartItem;

    const addItemToCartHelper = (cartItem) => {
        dispatch(addItemToCart(
            cartItems,
            cartItem
        ));
    }

    const removeItemFromCartHelper = (cartItem) => {
        dispatch(removeItemFromCart(
            cartItems,
            cartItem
        ));
    }

    const clearItemFromCartHelper = (cartItem) => {
        dispatch(clearItemFromCart(
            cartItems,
            cartItem
        ));
    }

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemFromCartHelper(cartItem)}>
                    &#10094;
                </div>
                <span className="value">
                    {quantity}
                </span>
                <div className="arrow" onClick={removeItemFromCartHelper(cartItem)}>
                    &#10095;
                </div>
            </span>
            <span className="price">${price}</span>
            <div className='remove-button' onClick={clearItemFromCartHelper(cartItem)}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem;