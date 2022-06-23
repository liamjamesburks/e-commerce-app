import { Routes, Route } from 'react-router-dom';
import { useContext } from "react";

import { CategoriesContext } from "../../components/contexts/categories.context";

import CategoriesPreview from "../categories-preview/categories-preview.component";

import './shop.style.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Category from "../../components/category/category.component";

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop;