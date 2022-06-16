import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import './navbar.styles.scss';
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

const Navbar = () => {
    return (
        <Fragment>
            <div className="navbar">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo"/>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop"> Shop </Link>
                    <Link className="nav-link" to="/auth"> Sign In </Link>
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
}


export default Navbar;