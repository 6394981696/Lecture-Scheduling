import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (!username.trim() || !password.trim()) {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      try {
        const { data } = await axios.post(loginRoute, { username, password });
        if (!data.status) {
          toast.error(data.msg, toastOptions);
        } else {
          const userKey = data.user.isAdmin ? "secret-key-admin" : "secret-key";
          localStorage.setItem(userKey, JSON.stringify(data.user));
          navigate(data.user.isAdmin ? "/admin" : "/instructor");
        }
      } catch (error) {
        toast.error("Login failed. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <h1>Lecture Schedule</h1>
          </div>
          <Input 
            type="text" 
            placeholder="Username" 
            name="username" 
            onChange={handleChange} 
            autoComplete="username" 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={handleChange} 
            autoComplete="current-password" 
          />
          <SubmitButton type="submit">Log In</SubmitButton>
          <span>
            Don't have an account? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3e0db;
  padding: 2rem;

  .brand {
    text-align: center;
    h1 {
      color: #d4af37;
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #fff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  span {
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 0.1rem solid #d2b48c;
  border-radius: 0.4rem;
  width: 100%;
  font-size: 1rem;

  &:focus {
    border-color: #b76e79;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #d4af37;
  color: white;
  padding: 1rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;

  &:hover {
    background-color: #b76e79;
  }
`;
