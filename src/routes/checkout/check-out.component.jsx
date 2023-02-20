import React from 'react';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';
import { useContext } from 'react';
import { cartContex } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const CheckOut = () => {
    const { cartItems , totalPrice } = useContext(cartContex);
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Qyantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map( item => {
                return <CheckoutItem cartItem={item} key={item.id} />
            })}
            <Total>{`total: $${totalPrice}`}</Total>
        </CheckoutContainer>
    )
}

export default CheckOut;