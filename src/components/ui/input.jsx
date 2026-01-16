// src/components/ui/Input.jsx
import React from 'react';
import '../css/input.css';

const Input = ({ label, type = "text", placeholder, value, onChange, name, required = false }) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <input
                type={type}
                name={name}
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default Input;