import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import './SignupForm.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5003/api/signup', formData);
            alert('User created successfully');
            setFormData({ username: '', password: '', email: '' }); 
        } catch (error) {
            console.error(error.response.data);
            alert('Signup failed');
        }
    };

    return (
        <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up</button>
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            
        </form>
        </div>
    );
};

export default SignupForm;
