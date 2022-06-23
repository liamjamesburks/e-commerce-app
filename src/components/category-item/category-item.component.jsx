import {Link} from "react-router-dom";

import './category-item.style.scss';

const CategoryItem = ({ category }) => {
    return (
        <div className="category-container">
            <div className="background-image"
                 style={{
                     'backgroundImage': `url(${category.imageUrl})`
                 }}
            />
            <div className="category-body-container">
                <Link to={`shop/${category.title}`}>
                    <h2>
                        { category.title }
                    </h2>
                    <p>
                        Shop now
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default CategoryItem;