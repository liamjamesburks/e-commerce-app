import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { CartContext } from "../contexts/cart.context";

import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import './navbar.styles.scss';
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import {signOutUser} from "../../utils/firebase/firebase.utils";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Navbar = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <div className="navbar">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo"/>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop"> Shop </Link>
                    {
                        currentUser ? (
                            <span onClick={ signOutUser } className="nav-link">Sign Out</span>
                        ) : (
                            <Link className="nav-link" to="/auth"> Sign In </Link>
                        )
                    }
                    <CartIcon></CartIcon>
                </div>
                { isCartOpen && <CartDropdown />}
            </div>

            <Outlet />
        </Fragment>
    )
}


export default Navbar;