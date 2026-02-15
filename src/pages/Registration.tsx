import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

export default function Registration() {
    const navigate = useNavigate();
    const [gender, setGender] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        mobile: ""
    });

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = "Name can only contain letters and spaces";
        }

        // Age validation
        if (!formData.age) {
            newErrors.age = "Age is required";
        } else {
            const ageNum = parseInt(formData.age);
            if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
                newErrors.age = "Age must be between 1 and 120";
            }
        }

        // Gender validation
        if (!gender) {
            newErrors.gender = "Please select a gender";
        }

        // Mobile validation - must be exactly 10 digits
        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else {
            const mobileDigits = formData.mobile.replace(/\D/g, ''); // Remove non-digits
            if (mobileDigits.length !== 10) {
                newErrors.mobile = "Mobile number must be exactly 10 digits";
            } else if (!/^[6-9]/.test(mobileDigits)) {
                newErrors.mobile = "Mobile number must start with 6, 7, 8, or 9";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Clean mobile number (remove any non-digits)
            const cleanMobile = formData.mobile.replace(/\D/g, '');
            localStorage.setItem("patientData", JSON.stringify({ 
                ...formData, 
                mobile: cleanMobile,
                gender 
            }));
            navigate("/complaint");
        }
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow digits, max 10
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, mobile: value });
        // Clear error when user starts typing
        if (errors.mobile) {
            setErrors({ ...errors, mobile: '' });
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: e.target.value });
        if (errors.name) {
            setErrors({ ...errors, name: '' });
        }
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, age: e.target.value });
        if (errors.age) {
            setErrors({ ...errors, age: '' });
        }
    };

    return (
        <div className="registration-container">
            <div className="reg-content">
                <h1 className="title">Patient Registration</h1>
                <p className="subtitle">Please enter your details to proceed</p>

                <form onSubmit={handleSubmit} className="reg-card glass-panel">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={handleNameChange}
                            className={`input-field ${errors.name ? 'error' : ''}`}
                            required
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="input-group">
                        <label>Age (Years)</label>
                        <input
                            type="number"
                            placeholder="e.g. 25"
                            value={formData.age}
                            onChange={handleAgeChange}
                            className={`input-field ${errors.age ? 'error' : ''}`}
                            min="1"
                            max="120"
                            required
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>

                    <div className="input-group">
                        <label>Gender</label>
                        <div className="gender-row">
                            {["Male", "Female", "Other"].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                        setGender(item);
                                        if (errors.gender) {
                                            setErrors({ ...errors, gender: '' });
                                        }
                                    }}
                                    className={`gender-btn ${gender === item ? "active" : ""}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        {errors.gender && <span className="error-message">{errors.gender}</span>}
                    </div>

                    <div className="input-group">
                        <label>Mobile Number (10 digits)</label>
                        <input
                            type="tel"
                            placeholder="e.g. 9876543210"
                            value={formData.mobile}
                            onChange={handleMobileChange}
                            className={`input-field ${errors.mobile ? 'error' : ''}`}
                            maxLength={10}
                            required
                        />
                        {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                    </div>

                    <button type="submit" className="submit-btn">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}
