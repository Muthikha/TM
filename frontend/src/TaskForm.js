import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ task, onSubmit }) => {
    const [formData, setFormData] = useState(task || {
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
        if (task) {
            await axios.put(`https://tm-2.onrender.com/api/tasks/${task.id}`, formData);
        } else {
            await axios.post('https://tm-2.onrender.com/api/tasks', formData);
        }
        onSubmit();
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
                <label>Completed:</label>
                <input type="checkbox" name="completed" checked={formData.completed} onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TaskForm;
