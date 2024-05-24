import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SigninForm.css';

const SigninForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://tm-2.onrender.com/api/signin', formData);
            alert('Sign-in successful');
            navigate('/task'); // Redirect to home page on success
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            alert('Sign-in failed: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div className="signin-form-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SigninForm;
