import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import AllTasks from './AllTasks';
import ImportantTasks from './ImportantTasks';
import CompletedTasks from './CompletedTasks';
import YetToDoTasks from './YetToDoTasks';
import AddTaskModal from './AddTaskModal';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://tm-2.onrender.com/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTaskClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchTasks(); 
    };

    const location = useLocation();
    const isAuthPage = location.pathname === '/' || location.pathname === '/signin';

    return (
        <div>
            {!isAuthPage && <Navbar onAddTask={handleAddTaskClick} />}
            <Routes>
                <Route path="/task" element={<AllTasks tasks={tasks} fetchTasks={fetchTasks} />} />
                <Route path="/important" element={<ImportantTasks tasks={tasks.filter(task => task.important)} fetchTasks={fetchTasks} />} />
                <Route path="/completed" element={<CompletedTasks tasks={tasks.filter(task => task.completed)} fetchTasks={fetchTasks} />} />
                <Route path="/yet-to-do" element={<YetToDoTasks tasks={tasks.filter(task => !task.completed)} fetchTasks={fetchTasks} />} />
                <Route path="/" element={<SignupForm />} />
                <Route path="/signin" element={<SigninForm />} />
            </Routes>
            <AddTaskModal isOpen={isModalOpen} onClose={handleModalClose} onTaskAdded={fetchTasks} />
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
