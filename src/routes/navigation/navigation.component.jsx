import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {NavigationContainer, NavLink, NaveLinks, LogoContainer } from './navigation.styless.jsx';
import { useContext } from "react";
import { userContext } from "../../contexts/user.context";
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { cartContex } from '../../contexts/cart.context';

const Navigation = () => {
    const {currentUser } = useContext(userContext);
    const { isCartOpen } = useContext(cartContex);

    return(
    <>
    <NavigationContainer>

        <LogoContainer to='/'>
        <CrwnLogo className="logo"/>
        </LogoContainer>

        <NaveLinks>

            <NavLink to='shop' className="nav-link">SHOP</NavLink>
            {/* <NavLink to='contacts' className="nav-link">CONTACTS</NavLink> */}
            {
                currentUser ? 
                (<NavLink as='span' className="nav-link" onClick={signOutUser}>SIGN OUT</NavLink>) : 
                (<NavLink to='auth' className="nav-link">SIGN IN</NavLink>)
            }
            <CartIcon />
        </NaveLinks>
        { isCartOpen && <CartDropdown /> }
    </NavigationContainer>
    
    <Outlet />
    </>
    )
}

export default Navigation;