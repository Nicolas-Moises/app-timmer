import { HeaderContainer } from "./styles";

import { NavLink } from "react-router-dom";

import { Timer, Scroll  } from "phosphor-react";

import logo from '../../assets/logo.svg'

/* eslint-disable prettier/prettier */
export function Header() {
    return (
        <HeaderContainer>
            <img src={logo} />
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="History">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}
