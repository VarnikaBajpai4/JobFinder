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
}
