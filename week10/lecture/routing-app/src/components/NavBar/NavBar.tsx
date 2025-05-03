import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav> 
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/something">Something</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;