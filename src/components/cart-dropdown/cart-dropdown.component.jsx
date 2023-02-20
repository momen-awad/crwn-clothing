import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { cartContex } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(cartContex);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? 
                    cartItems.map( item => <CartItem productToAdd={item} key={item.id}/>) : 
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECK OUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;