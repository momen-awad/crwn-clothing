import ProductCard from '../product-cart/product-card.component';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles.jsx';
import { Link } from 'react-router-dom';


const CategoryPreview = ({title, products}) => {

    return (
        <CategoryPreviewContainer>
            <h2 className='category-title'>
                <Title to={title} className="title">
                    <span>{title.toUpperCase()}</span>
                </Title>
            </h2>
            <Preview>
                {
                    products.filter((_,index) => index < 4 )
                    .map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;