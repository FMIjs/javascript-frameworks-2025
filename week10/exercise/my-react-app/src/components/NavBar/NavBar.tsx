import { NavLink } from "react-router-dom"

import './NavBar.css'

export const NavBar = () => {
  return <nav id="navbar">
    <NavLink to="/cube">Cube</NavLink>
    <NavLink to="/pyramid">Pyramid</NavLink>
  </nav>
}
