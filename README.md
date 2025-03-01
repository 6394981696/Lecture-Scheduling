# Online Lecture Scheduling Module

## Project Overview

The Online Lecture Scheduling Module Serves the process of scheduling courses and lectures. The system includes an admin panel for course and lecture management, as well as an instructor panel to view assigned lectures.

## Features

### Admin Panel

1. **List of Instructors:**
   - Admin can view a list of all instructors.

2. **Course Management:**
   - Add courses with the following details:
     - Name
     - Level
     - Description
     - Image
   - Include multiple lectures (batches) for each course.

3. **Lecture Scheduling:**
   - Assign lectures to instructors on specific dates.
   - Ensure that no two schedules for lectures clash with each other.

4. **Date Assignment:**
   - Automatically assign dates to selected instructors when a course is added.

5. **Instructor Schedule Management:**
   - Prevent the assignment of an instructor to multiple lectures on the same date.

### Instructor Panel

- **Lecture Overview:**
  - Instructors can view a list of all lectures assigned to them.
  - Details include dates and course names.

## Technologies Used

- **Frontend:** React, Styled Components
- **Backend:** Node.js, Express, MongoDB
- **Additional Tools:** Axios, React Router



## Project Progress

The project has progressed from the initial concept to a functional Online Lecture Scheduling Module. Milestones include:

1. Implementing Role Based Login (for Admin & Instructors)
2. Implementing proper routing so that once user is logged in can not login again until logged out.
3. Implementing the protected routes using hooks in react.
4. Fetching instructor details and displayed on the admin panel
5. Creating course managment functionalities.



## Acknowledgments

I acknowledge the following tools and technologies that contributed to the development of this module:

- React
- Styled Components
- Node.js
- Express
- MongoDB
- Axios
- React Router

## Getting Started

### Prerequisites

Ensure the following software/tools are installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd online-lecture-scheduling-module
```

3. Install dependencies:

```bash
npm install
```

4. Run the application:

```bash
npm start
```
