import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  select,
  input {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
    background-color: #4e0eff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background-color: #2a0080;
    }
  }
`;

const IndividualCourse = ({ course, instructorData }) => {
  const { courseId } = useParams();
  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    lecture: "",
    location: "",
  });

  useEffect(() => {
    console.log("Course ID from URL:", courseId);
    console.log("Course Data:", course);
  }, [course, courseId]);

  if (!course || Object.keys(course).length === 0) {
    return <h2 style={{ textAlign: "center" }}>Loading course details...</h2>;
  }

  const handleChange = (e) => {
    setLectureData({ ...lectureData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Scheduled Lecture:", lectureData);
    setLectureData({ instructor: "", date: "", lecture: "", location: "" });
  };

  return (
    <Container>
      <Title>{course.name || "Course Details"}</Title>
      <ContentWrapper>
        <p>{course.description || "No description available."}</p>
        <Form onSubmit={handleSubmit}>
          <select
            name="instructor"
            value={lectureData.instructor}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructorData.length > 0 ? (
              instructorData.map((instructor, index) => (
                <option key={index} value={instructor.name}>
                  {instructor.name}
                </option>
              ))
            ) : (
              <option disabled>No Instructors Available</option>
            )}
          </select>

          <input
            type="date"
            name="date"
            value={lectureData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lecture"
            placeholder="Lecture Topic"
            value={lectureData.lecture}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={lectureData.location}
            onChange={handleChange}
            required
          />
          <button type="submit">Schedule Lecture</button>
        </Form>
      </ContentWrapper>
    </Container>
  );
};

// ✅ PropTypes for validation
IndividualCourse.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  instructorData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
    })
  ),
};

// ✅ Default props to prevent `undefined` errors
IndividualCourse.defaultProps = {
  course: {},
  instructorData: [],
};

export default IndividualCourse;
