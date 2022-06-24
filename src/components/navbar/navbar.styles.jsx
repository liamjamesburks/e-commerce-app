import styled from 'styled-components';
import {Link} from "react-router-dom";

export const NavigationContainer = styled.div`
    margin: 0;
    padding: 1rem;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`

export const NavLinksContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const NavLink = styled(Link)`
    padding: 0;
    margin: 0 0.5rem;
    
    cursor: pointer;
    
    &:hover {
        color: #6d6d6d;
    }
`

export const NavLinkSpan = styled.span`
    padding: 0;
    margin: 0 0.5rem;
    
    cursor: pointer;

    &:hover {
        color: #6d6d6d;
    }
`


// }

