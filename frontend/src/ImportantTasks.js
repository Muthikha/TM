import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskStyles.css'; // Import the common CSS file

const ImportantTasks = () => {
    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        const fetchImportantTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5003/api/tasks');
                const tasks = response.data;
                const filteredTasks = tasks.filter(task => task.important);
                setImportantTasks(filteredTasks);
            } catch (error) {
                console.error('Error fetching important tasks:', error);
            }
        };

        fetchImportantTasks();
    }, []);

    return (
        <div>
            <h1>Manage your important task to do</h1>
        <div className="task-container">
            {importantTasks.length === 0 ? (
                <p>No important tasks</p>
            ) : (
                importantTasks.map(task => (
                    <div className="task-box" key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Date: {task.date}</p>
                        <button className="delete-btn">Delete</button>
                    </div>
                ))
            )}
        </div>
        </div>
    );
};

export default ImportantTasks;
