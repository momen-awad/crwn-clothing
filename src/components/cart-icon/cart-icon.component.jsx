import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx';
import { useContext } from 'react';
import { cartContex } from '../../contexts/cart.context';


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen , cartItemscount } = useContext(cartContex);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartItemscount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;