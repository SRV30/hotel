import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(145deg, #ffffff, #f0f0f0); /* Subtle gradient */
  width: 90%; /* Default for small screens */
  max-width: 400px; /* Limit the max width for larger screens */
  margin: auto;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15); /* Softer shadow */
  padding: 25px;

  @media (min-width: 768px) {
    padding: 35px; /* Increase padding for tablets */
    width: 70%; /* Slightly larger width for tablets */
  }

  @media (min-width: 1024px) {
    padding: 40px; /* Increase padding for laptops */
    width: 400px; /* Fixed width for laptops and larger screens */
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;

  .MuiOutlinedInput-root {
    background-color: #f9f9f9; /* Light input background */
    border-radius: 8px; /* Rounded input */
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #d1d1d1; /* Soft border */
  }

  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #3f51b5; /* Primary color on hover */
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #3f51b5; /* Primary color on focus */
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: linear-gradient(135deg, #3f51b5, #1a237e); /* Gradient button */
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-transform: none; /* Prevent uppercase */
  border-radius: 8px;

  &:hover {
    background: linear-gradient(135deg, #1a237e, #3f51b5); /* Reverse gradient on hover */
  }
`;

const StyledHeading = styled.h3`
  font-size: 1.5rem;
  color: #3f51b5; /* Primary color */
  margin-bottom: 10px;
`;

const StyledTypography = styled(Typography)`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4a4a4a; /* Neutral text color */
`;

const initialLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginData, setLoginData] = useState(initialLogin);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    // Mock API call or local validation
    if (loginData.email === "admin@example.com" && loginData.password === "password") {
      alert("Login Successful!");
      navigate("/admindashboard"); // Redirect to the dashboard
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh", // Use minHeight instead of height
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Soft gradient background
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Add padding for small screens
      }}
    >
      <Container>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StyledHeading>ADMIN LOGIN</StyledHeading>
          <StyledTextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleLoginChange}
          />
          <StyledTextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <StyledButton variant="contained" onClick={handleUserLogin}>
            Login
          </StyledButton>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
