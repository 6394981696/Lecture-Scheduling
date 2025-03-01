import React, { useEffect } from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { useNavigate } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";

export default function Welcome({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, [navigate]); // Added 'navigate' to the dependency array

  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading>Welcome Admin</Heading>
      </TopBar>
      <MainContent>
        <InstructorsContainer>
          <Instructors user={user} />
        </InstructorsContainer>
        <CoursesContainer>
          <Courses user={user} />
        </CoursesContainer>
      </MainContent>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0f52ba;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 100%;
  width: 100%;
`;

const InstructorsContainer = styled.div`
  width: 40%;
  background-color: #daa520; /* Muted Gold */
  color: #ffffff; /* White */
  padding: 1rem;
  border-radius: 0.5rem;
`;

const CoursesContainer = styled.div`
  width: 60%;
  background-color: #0f52ba; /* Sapphire Blue */
  color: #333333; /* Dark Gray */
  padding: 1rem;
  border-radius: 0.5rem;
`;

const TopBar = styled.div`
  width: 100%;
  background: #2c3e50;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: #559f49; /* Green */
  font-size: 28px;
  font-weight: bold;
  margin-top: 8px;
`;
