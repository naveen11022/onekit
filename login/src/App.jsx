import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const ReachUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        privacyPolicy: false,
        futureOpportunities: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/submit', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                portfolio: formData.portfolio,
                privacy_policy: formData.privacyPolicy,
                future_opportunities: formData.futureOpportunities,
            });
            alert(response.data.message);
        } catch (error) {
            alert("Error: " + error.response?.data?.message || "Submission failed");
        }
    };

    return (
        <div className="part-main">
            <div className="form-cont">
                <form onSubmit={handleSubmit}>
                    <input
                        className="part1"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        className="part1"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        className="part1"
                        type="number"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        className="part1"
                        type="url"
                        name="portfolio"
                        placeholder="Portfolio URL"
                        value={formData.portfolio}
                        onChange={handleChange}
                    />
                    <br />
                    <div className="priv1">
                        <input
                            type="checkbox"
                            name="privacyPolicy"
                            checked={formData.privacyPolicy}
                            onChange={handleChange}
                        />
                        <p>I have read the Privacy Policy and confirm that onekit stores my personal details to process my job application.</p>
                    </div>
                    <div className="priv1">
                        <input
                            type="checkbox"
                            name="futureOpportunities"
                            checked={formData.futureOpportunities}
                            onChange={handleChange}
                        />
                        <p>Yes, onekit can also contact me about future job opportunities.</p>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="cont1">
                <h1>Let'onekit.</h1>
                <h1 style={{ fontWeight: 100 }}>together</h1>
            </div>
        </div>
    );
};

export default ReachUs;
