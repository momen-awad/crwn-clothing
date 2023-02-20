import { CartItemContainer, ItemDetails, Name } from './cart-item.styles.jsx';

const CartItem = ({productToAdd}) => {
    const { name, quantity, imageUrl , price } = productToAdd;
    
    return ( 
    <CartItemContainer>
        <img src={imageUrl} alt={name}/>
        <ItemDetails>
            <Name>{name}</Name>
            <span className='price'>{ `${quantity} x $${price}`}</span>
        </ItemDetails>
    </CartItemContainer> 
    );
}

export default CartItem;