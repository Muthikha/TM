import React from 'react';
import './TaskStyles.css'; // Import the specific CSS file for YetToDoTasks

const YetToDoTasks = ({ tasks }) => {
    return (
        <div className="task-container">
            {tasks.length === 0 ? (
                <p>No tasks yet to do</p>
            ) : (
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li className="task-box" key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>{task.date}</p>
                            <button className="complete-btn">Mark as Completed</button>
                            <button className="delete-btn">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default YetToDoTasks;
