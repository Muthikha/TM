import React, { useState } from 'react';
import axios from 'axios';
import './AllTasks.css'; // Import the CSS file for styling
import confetti from 'canvas-confetti';

const AllTasks = ({ tasks, fetchTasks }) => {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        date: '',
        completed: false,
    });
    const [completedAnimation, setCompletedAnimation] = useState(false);

    const handleEditClick = (task) => {
        setEditTaskId(task.id);
        setEditFormData({
            title: task.title,
            description: task.description,
            date: task.date,
            completed: task.completed,
        });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5003/api/tasks/${editTaskId}`, editFormData);
            setEditTaskId(null);
            fetchTasks(); // Refresh tasks list
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleCancelClick = () => {
        setEditTaskId(null);
    };

    const handleDeleteClick = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5003/api/tasks/${taskId}`);
            fetchTasks(); // Refresh tasks list after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCompleteClick = async (task) => {
        if (!task.completed) {
            try {
                await axios.put(`http://localhost:5003/api/tasks/${task.id}`, { ...task, completed: true });
                fetchTasks(); // Refresh tasks list after marking as completed
                setCompletedAnimation(true); // Trigger animation
                confetti(); // Trigger the confetti effect
                setTimeout(() => {
                    setCompletedAnimation(false); // Reset animation after some time
                }, 3000); // Adjust reset time as needed
            } catch (error) {
                console.error('Error marking task as completed:', error);
            }
        } else {
            alert('This task is already completed.');
        }
    };

    return (
        <div className="task-container">
            {tasks.length === 0 ? (
                <p>No tasks yet</p>
            ) : (
                tasks.map((task) => (
                    <div className="task-box" key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>{task.date}</p>
                        <div className="button-container">
                            {task.completed ? (
                                <p>Completed</p>
                            ) : (
                                <button
                                    className={`complete-btn ${completedAnimation ? 'animate' : ''}`}
                                    onClick={() => handleCompleteClick(task)}
                                >
                                    Mark as Completed
                                </button>
                            )}
                            <button className="edit-btn" onClick={() => handleEditClick(task)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDeleteClick(task.id)}>
                                Delete
                            </button>
                        </div>
                        {completedAnimation && (
                            <>
                                <div className="ribbon" style={{ left: `${Math.random() * 100}%` }} />
                                <div className="ribbon" style={{ left: `${Math.random() * 100}%` }} />
                                <div className="flower" style={{ left: `${Math.random() * 100}%` }} />
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AllTasks;
