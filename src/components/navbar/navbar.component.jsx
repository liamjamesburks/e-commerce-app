import { useContext } from "react";
import {UserContext} from "../contexts/user.context";

import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import './navbar.styles.scss';
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navbar = () => {
    const { currentUser } = useContext(UserContext);

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
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
}


export default Navbar;