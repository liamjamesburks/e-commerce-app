import { useParams } from "react-router-dom";
import { useContext, useState, useEffect  } from "react";

import { CategoriesContext } from "../contexts/categories.context";

import ProductCard from "../product-card/product-card.component";

import './category.style.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap]);

    return (
        <div>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container-2">
                {
                    products && products.map((product) => {
                        return <ProductCard key={product.id} product={product}></ProductCard>
                    })
                }
            </div>
        </div>
    )
}

export default Category;