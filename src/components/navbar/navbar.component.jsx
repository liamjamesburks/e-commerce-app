import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { CartContext } from "../contexts/cart.context";

import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import {signOutUser} from "../../utils/firebase/firebase.utils";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink, NavLinkSpan } from "./navbar.styles";

const Navbar = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>

                <NavLinksContainer>
                    <NavLink to="/shop">
                        Shop
                    </NavLink>

                    {
                        currentUser ? (
                            <NavLink onClick={ signOutUser } to="/">
                                Sign Out
                            </NavLink>
                        ) : (
                            <NavLink to="/auth">
                                Sign In
                            </NavLink>
                        )
                    }

                    <CartIcon></CartIcon>
                </NavLinksContainer>
                { isCartOpen && <CartDropdown />}
            </NavigationContainer>

            <Outlet />
        </Fragment>
    )
}


export default Navbar;