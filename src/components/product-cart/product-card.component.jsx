import { ProductCardContainer, Footer } from './product-card.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useContext } from 'react';
import { cartContex } from '../../contexts/cart.context';

const  ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const { addItemToCart } = useContext(cartContex);
    const addProductToCart = () => addItemToCart(product);
    
    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={name}/>
            <Footer>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
        </ProductCardContainer>
    )
}

export default  ProductCard;