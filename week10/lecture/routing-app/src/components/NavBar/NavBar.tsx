import { useTheme } from '../../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';


function NavBar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/shopping-cart" className={({ isActive }) => isActive ? styles.active : ''}>Shopping Cart</NavLink></li>
      </ul>
      <button 
        onClick={toggleTheme}
        className={styles.themeToggle}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>
    </nav>
  );
}

export default NavBar;