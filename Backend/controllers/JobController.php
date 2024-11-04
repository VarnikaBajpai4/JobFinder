<?php
// controllers/JobController.php

require_once __DIR__ . '/../config/database.php';

class JobController {
    private $conn;


    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getJobListings() {
        $stmt = $this->conn->prepare("
            SELECT job_posts.job_id, job_posts.job_title, job_posts.location, job_posts.job_description, employers.company_name 
            FROM job_posts 
            JOIN employers ON job_posts.employer_id = employers.employer_id
        ");
        
        $stmt->execute();
        $jobListings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return ['success' => true, 'data' => $jobListings];
    }
    public function addJobListing($data)
    {
        session_start();
        
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

}


