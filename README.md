JobFinder
JobFinder is a job listing and application web platform built specifically for connecting software developers seeking full-time positions with employers looking to fill such roles. This platform allows job seekers to apply for jobs and track their applications, while employers can post job listings and manage applicant information efficiently.

Features
For Job Seekers
User Authentication: Register as a Job Seeker and log in to access features.
Profile Management: Complete a profile with details like name, location, skills, and upload a resume.
Job Listings: View all available job listings posted by employers.
Job Application: Apply to jobs directly through the platform and track application status.
Application Tracking: View the list of applied jobs and check their application statuses.
For Employers
User Authentication: Register as an Employer and log in to post and manage job listings.
Profile Management: Add employer details, such as company name, description, and location.
Job Posting: Post new job listings, specifying required skills, experience, and job type.
Application Management: View and manage applicants for each job listing, update application statuses (e.g., accept or reject), and access job seeker details.
Tech Stack
Frontend
React.js: For building interactive user interfaces and managing frontend components.
React Router: Used for handling routing between different pages.
Material-UI: Provides styling and pre-built UI components for a consistent and user-friendly design.
Backend
PHP: Handles server-side logic and interactions with the database.
MySQL: Stores user information, job postings, and application details.
RESTful API: Built to handle CRUD operations, implemented via PHP scripts for handling requests.
Database Structure
Users Table: Contains user credentials (username, email, password, role).
Job Seekers Table: Stores job seeker-specific details such as location, skills, and resume.
Employers Table: Holds employer information like company name, description, and location.
Job Posts Table: Contains job listings with details like title, description, location, experience required, and salary.
Job Applications Table: Tracks applications made by job seekers, with statuses (e.g., pending, accepted, rejected).
Project Structure
Frontend
src/components: Contains reusable UI components (e.g., LandingPage, JobSeekerDetails, EmployerDetails).
src/hooks: Custom React hooks for managing authentication and redirection.
src/pages: Pages corresponding to different sections, like JobSeekerHome and EmployerHome.
Backend
public/api.php: Main entry point for handling API requests.
controllers/: Contains classes like UserController, EmployerController, and JobController to manage various backend operations.
config/database.php: Establishes the MySQL database connection.
app/Router.php: Routes incoming API requests to appropriate controllers based on the action parameter.