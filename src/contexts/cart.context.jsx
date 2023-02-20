import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd)=> {
    const existingCartItem =  cartItems.find(CartItem => CartItem.id === productToAdd.id);
    
    if(existingCartItem){
        return cartItems.map(cartItem => {
            return cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1 } :
            cartItem
        });
    }
    
    return [...cartItems,{...productToAdd,quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem =  cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    
    return cartItems.map(cartItem => {
        return cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1 } :
        cartItem
    });
}

const clearCartItem = (cartItems,cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}


export const cartContex = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart : () => {},
    cartItemscount : 0,
    removeItemToCart: () => {},
    clearItemFromCart : () => {},
    totalPrice : 0,
});


export const CartProvider = ({children}) => {

    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartItemscount, setCartItemscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=> {
        const newItemsCount = cartItems.reduce((total,cartItem)=> {
            return total + cartItem.quantity;
        },0)
        setCartItemscount(newItemsCount);
    },[cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    
    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    useEffect(()=> {
        const newCartTotal = cartItems.reduce((total,cartItem)=> {
            return total + cartItem.quantity * cartItem.price;
        },0)
        setTotalPrice(newCartTotal);
    },[cartItems]);

    const value = { 
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        clearItemFromCart,
        cartItemscount,
        removeItemToCart, 
        totalPrice
    };

    return <cartContex.Provider value={value}>{children}</cartContex.Provider>
}