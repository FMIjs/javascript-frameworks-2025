import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import styles from './NavBar.module.css';

function NavBar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/something">Something</Link></li>
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