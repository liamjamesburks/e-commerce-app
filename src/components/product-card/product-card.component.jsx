import './product-card.style.scss';

import Button from "../button/button.component";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;

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
            <Button buttonType='inverted'>
                Add to Cart
            </Button>
        </div>
    )
}

export default ProductCard;