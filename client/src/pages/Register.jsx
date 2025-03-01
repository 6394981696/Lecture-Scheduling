import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters.", toastOptions);
      return false;
    } else if (!email) {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { email, username, password, isAdmin } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
          isAdmin,
        });

        if (!data.status) {
          toast.error(data.msg, toastOptions);
        } else {
          localStorage.setItem(
            data.user.isAdmin ? "secret-key-admin" : "secret-key",
            JSON.stringify(data.user)
          );
          navigate(data.user.isAdmin ? "/admin" : "/instructor");
        }
      } catch (error) {
        toast.error("Registration failed. Please try again.", toastOptions);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <>
      <FormContainer>
        <div className="brand">
          <h1>Online Lecture Scheduling</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Username" name="username" onChange={handleChange} />
          <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
          <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
          <div className="checkbox-container">
            <Checkbox type="checkbox" id="isAdmin" name="isAdmin" checked={values.isAdmin} onChange={handleChange} />
            <label htmlFor="isAdmin">Admin</label>
          </div>
          <SubmitButton type="submit">Create User</SubmitButton>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3e0db;
  padding: 2rem;
  .brand h1 {
    color: #d4af37;
    text-transform: uppercase;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  span {
    text-align: center;
    font-weight: bold;
    color: #d4af37;
  }
  a {
    color: red;
    text-decoration: none;
    font-weight: bold;
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 0.1rem solid #d2b48c;
  border-radius: 0.4rem;
  font-size: 1rem;
  &:focus {
    border-color: #b76e79;
    outline: none;
  }
`;

const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  margin-right: 0.5rem;
  &:checked {
    background-color: #d4af37;
  }
`;

const SubmitButton = styled.button`
  background-color: #d4af37;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #b76e79;
  }
`;
