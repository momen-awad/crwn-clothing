import { CayegoryContainer, CategoryTitle } from './category.styles.jsx';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { categoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-cart/product-card.component';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(categoriesContext);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category])

    },[category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>
            <CayegoryContainer>
                {products &&
                    products.map(product => {
                        return <ProductCard key={product.id} product={product}/>
                    })
                }     
            </CayegoryContainer>
        </>
    )
}

export default Category;