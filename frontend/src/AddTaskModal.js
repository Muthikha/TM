import React, { useState } from 'react';
import axios from 'axios';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, onTaskAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        completed: false,
        important: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://tm-2.onrender.com/api/tasks', formData);
            onTaskAdded();
            onClose();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Completed:</label>
                        <input type="checkbox" name="completed" checked={formData.completed} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Important:</label>
                        <input type="checkbox" name="important" checked={formData.important} onChange={handleChange} />
                    </div>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
