import { useState } from "react";
import DOMPurify from "dompurify";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const sanitizeInput = (value) => DOMPurify.sanitize(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: sanitizeInput(value.trim()),
    };

    setFormData(updatedData);
    validateForm(updatedData);
  };

  const validateForm = (data = formData) => {
    let valid = true;
    let newErrors = {};

    if (data.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    const emailPattern =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (data.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailPattern.test(data.email)) {
      newErrors.email = "Enter valid email";
      valid = false;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (data.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!passwordPattern.test(data.password)) {
      newErrors.password =
        "Min 6 chars, 1 uppercase, 1 number, 1 special char";
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);

    return valid;
  };
  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateForm(formData);
    if (!isValid) return;

    setSubmittedData(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="form-container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Password: {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}

export default App;
