import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onAddTask }) => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">TASK TODAY</Link>
            <ul className="navbar-links">
                <li><Link to="/task">All Tasks</Link></li>
                <li><Link to="/important">Important Tasks</Link></li>
                <li><Link to="/completed">Completed Tasks</Link></li>
                <li><Link to="/yet-to-do">Yet to Do Tasks</Link></li>
            </ul>
            <div className="nav-buttons-container">
                <button className="add-task-btn" onClick={onAddTask}>Add New Task</button>
                <Link to="/" className="logout-btn">Logout</Link>
            </div>
        </nav>
    );
};

export default Navbar;
