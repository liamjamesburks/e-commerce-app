import './cart-dropdown.style.scss';
import Button from "../button/button.component";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { selectCartItems } from "../../store/cart/cart.selector";

import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const cartItems = selectCartItems;

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map((item) => {
                        return (
                            <CartItem key={item.id} cartItem={item}/>
                        )
                    })
                }
            </div>
            <Button onClick={goToCheckoutHandler} buttonType={BUTTON_TYPE_CLASSES.default}> Go to Checkout </Button>
        </div>
    )
}

export default CartDropdown;