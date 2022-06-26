import { useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

import ProductCard from "../product-card/product-card.component";

import './category.style.scss';

const Category = () => {
    console.log('render/re-rendering category component');

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('effect fired calling setProducts')

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