import React from 'react';
import './TaskStyles.css';

const CompletedTasks = ({ tasks }) => {
    return (
        <div>
            <h1>Completed Tasks</h1>
        <div className="task-container">
            
            {tasks.length === 0 ? (
                <p>No completed tasks</p>
            ) : (
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li className="task-box" key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>{task.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
};

export default CompletedTasks;
