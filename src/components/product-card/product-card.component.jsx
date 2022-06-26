import './product-card.style.scss';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useDispatch } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch(addItemToCart(product));

    return (
        <div className="product-card-container">
            <img src={ imageUrl } alt={name} />
            <div className="product-card-footer">
                <span className="product-name">
                    { name }
                </span>
                <span className="product-price">
                    { price }
                </span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                Add to Cart
            </Button>
        </div>
    )
}

export default ProductCard;