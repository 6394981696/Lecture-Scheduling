import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { getUserSchedule } from "../../utils/APIRoutes";
import axios from "axios";
import loaderImage from "../../assets/loader.gif";

const Instructor = () => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      const user = JSON.parse(userKey);
      setCurrUser(user.username);
    } else {
      navigate("/");
    }
  }, [navigate, adminKey, userKey]);

  useEffect(() => {
    if (!currUser) return; // Ensure currUser is set before making the API call

    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const response = await axios.get(getUserSchedule, {
          params: { username: currUser }, // Ensure param key matches backend
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [currUser]); // Remove 'schedules' dependency to avoid infinite loops

  if (loading) {
    return (
      <LoaderContainer>
        <LoaderImage src={loaderImage} alt="Loading..." />
      </LoaderContainer>
    );
  }

  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading>Welcome {currUser}</Heading>
      </TopBar>
      <MainContent>
        <LecturesContainer>
          <SectionHeading>Your Upcoming Lectures</SectionHeading>
          <ScrollableContent>
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <LectureCard key={index}>
                  <CardHeading>Course:</CardHeading>
                  <CourseContent>{schedule.course}</CourseContent>

                  <CardHeading>Lecture:</CardHeading>
                  <LectureContent>{schedule.lecture}</LectureContent>

                  <CardHeading>Date:</CardHeading>
                  <DateContent>
                    {new Date(schedule.date).toLocaleDateString()}
                  </DateContent>

                  <CardHeading>Location:</CardHeading>
                  <LocationContent>{schedule.location}</LocationContent>
                </LectureCard>
              ))
            ) : (
              <NoLectures>No upcoming lectures found.</NoLectures>
            )}
          </ScrollableContent>
        </LecturesContainer>
      </MainContent>
    </WelcomeContainer>
  );
};

// Styled Components
const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderImage = styled.img`
  width: 80px;
  height: 80px;
`;

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #4d394b;
  padding-bottom: 1rem;
`;

const TopBar = styled.div`
  width: 100%;
  background: #eadce6;
  padding: 25px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  margin-top: 40px;
`;

const LecturesContainer = styled.div`
  width: 100%;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
`;

const LectureCard = styled.div`
  background-color: #420f0f;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 40%;
  box-sizing: border-box;
`;

const SectionHeading = styled.h2`
  color: #fff;
  font-size: 24px;
  margin-bottom: 15px;
`;

const CardHeading = styled.h3`
  color: #fff;
  font-size: 25px;
  margin-bottom: 10px;
`;

const CardContent = styled.p`
  margin-bottom: 15px;
  font-size: 18px;
  color: #c0c0c0;
`;

const CourseContent = styled(CardContent)`
  color: #ffd700;
  font-weight: bold;
  font-size: 25px;
`;

const LectureContent = styled(CardContent)`
  color: #000000;
  font-style: italic;
  font-size: 25px;
  font-weight: bold;
`;

const DateContent = styled(CardContent)`
  color: #d4a2b0;
  font-weight: bold;
  font-size: 25px;
`;

const LocationContent = styled(CardContent)`
  color: #c0c0c0;
  font-size: 16px;
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 10px;
  overflow: hidden;
  width: 100%;
`;

const NoLectures = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

export default Instructor;
