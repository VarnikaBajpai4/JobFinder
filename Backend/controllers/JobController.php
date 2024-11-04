<?php
// controllers/JobController.php


require_once __DIR__ . '/../config/database.php';

class JobController
{
    private $conn;


    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getJobListings()
    {
        $stmt = $this->conn->prepare("
            SELECT job_posts.job_id, job_posts.job_title, job_posts.location, job_posts.job_description, employers.company_name 
            FROM job_posts 
            JOIN employers ON job_posts.employer_id = employers.employer_id
        ");

        $stmt->execute();
        $jobListings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return ['success' => true, 'data' => $jobListings];
    }
    // In JobController.php
    public function applyForJob($jobId)
    {
        session_start();
        //error_log("applyForJob session data after session_start: " . print_r($_SESSION, true));
        error_log("Session ID: " . session_id());

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            error_log("User not authenticated in applyForJob.");
            return ['success' => false, 'message' => 'User not authenticated.'];
        }



        try {
            // Get the seeker_id for the authenticated user
            $stmt = $this->conn->prepare("SELECT seeker_id FROM job_seekers WHERE user_id = ?");
            $stmt->execute([$userId]);
            $seeker = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$seeker) {
                return ['success' => false, 'message' => 'User ID not found in the job_seekers table.'];
            }

            $seekerId = $seeker['seeker_id'];

            // Check if the application already exists
            $stmt = $this->conn->prepare("SELECT * FROM job_applications WHERE job_id = ? AND seeker_id = ?");
            $stmt->execute([$jobId, $seekerId]);
            $existingApplication = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingApplication) {
                return ['success' => false, 'message' => 'You have already applied for this job.'];
            }

            // Insert the application into the job_applications table
            $stmt = $this->conn->prepare("INSERT INTO job_applications (job_id, seeker_id) VALUES (?, ?)");
            $stmt->execute([$jobId, $seekerId]);

            return ['success' => true, 'message' => 'Application submitted successfully.'];
        } catch (PDOException $e) {
            error_log("Database error in applyForJob: " . $e->getMessage());
            return ['success' => false, 'message' => 'Error submitting application.'];
        }
    }



    public function getJobDetails($jobId)
    {
        $stmt = $this->conn->prepare("
        SELECT job_posts.job_id, job_posts.job_title, job_posts.location, job_posts.min_experience, 
               job_posts.salary, job_posts.job_description, job_posts.employment_type, 
               employers.company_name, employers.company_description 
        FROM job_posts 
        JOIN employers ON job_posts.employer_id = employers.employer_id 
        WHERE job_posts.job_id = ?
    ");
        $stmt->execute([$jobId]);
        $jobDetails = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($jobDetails) {
            return ['success' => true, 'data' => $jobDetails];
        } else {
            return ['success' => false, 'message' => 'Job details not found'];
        }
    }

    public function addJobListing($data)
    {
        session_start();
        error_log("Session ID: " . session_id());


        // Check if user is authenticated
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        try {
            // Get the employer_id for the logged-in user
            $stmt = $this->conn->prepare("SELECT employer_id FROM employers WHERE user_id = ?");
            $stmt->execute([$userId]);
            $employer = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$employer) {
                return ['success' => false, 'message' => 'Employer ID not found.'];
            }

            $employerId = $employer['employer_id'];

            // Insert job post into job_posts table
            $stmt = $this->conn->prepare("INSERT INTO job_posts (employer_id, job_title, location, min_experience, salary, job_description, employment_type) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $employerId,
                $data['job_title'],
                $data['location'],
                $data['min_experience'],
                $data['salary'],
                $data['job_description'],
                $data['employment_type']
            ]);

            return ['success' => true, 'message' => 'Job listing added successfully.'];
        } catch (PDOException $e) {
            error_log("Database error in addJobListing: " . $e->getMessage());
            return ['success' => false, 'message' => 'Error adding job listing.'];
        }
    }

    public function trackApplications()
    {
        session_start();


        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        try {
            // Get the employer_id based on the logged-in user's ID
            $stmt = $this->conn->prepare("SELECT employer_id FROM employers WHERE user_id = ?");
            $stmt->execute([$userId]);
            $employer = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$employer) {
                return ['success' => false, 'message' => 'Employer not found.'];
            }

            $employerId = $employer['employer_id'];

            // Fetch job applications for the employer's job posts
            $stmt = $this->conn->prepare("
            SELECT job_applications.application_id, job_applications.application_status, job_applications.applied_at,
                   job_posts.job_title, job_seekers.seeker_id, job_seekers.full_name
            FROM job_applications
            JOIN job_posts ON job_applications.job_id = job_posts.job_id
            JOIN job_seekers ON job_applications.seeker_id = job_seekers.seeker_id
            WHERE job_posts.employer_id = ?
            ORDER BY job_applications.applied_at DESC
        ");
            $stmt->execute([$employerId]);
            $applications = $stmt->fetchAll(PDO::FETCH_ASSOC);
            error_log("Applications: " . print_r($applications, true));


            return ['success' => true, 'data' => $applications];
        } catch (PDOException $e) {
            error_log("Database error in trackApplications: " . $e->getMessage());
            return ['success' => false, 'message' => 'Error fetching applications.'];
        }
    }
}
