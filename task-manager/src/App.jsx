import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Todo List</Link></li>
            <li><Link to="/add">Add Todo</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/add" element={<AddTodo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 