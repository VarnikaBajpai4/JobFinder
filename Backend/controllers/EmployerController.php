<?php
// controllers/EmployerController.php

require_once __DIR__ . '/../config/database.php';

class EmployerController
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function saveEmployerDetails($data)
    {
        // Validate required fields
        if (empty($data['companyName']) || empty($data['location']) || empty($data['companyDescription'])) {
            return ['success' => false, 'message' => 'All fields are required.'];
        }

        // Get user_id from session
        session_start();
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        // Save employer details
        if ($this->saveEmployerDetailsToDb($data, $userId)) {
            return ['success' => true, 'message' => 'Employer details saved successfully.'];
        } else {
            return ['success' => false, 'message' => 'Failed to save employer details.'];
        }
    }
public function getEmployerJobListings() {
        session_start();

        if (!isset($_SESSION['user_id'])) {
            error_log("User not authenticated");
            return ['success' => false, 'message' => 'User not authenticated'];
        }

        $userId = $_SESSION['user_id'];

        try {
            // Step 1: Get employer_id from the employers table based on user_id
            $stmt = $this->conn->prepare("SELECT employer_id FROM employers WHERE user_id = ?");
            $stmt->execute([$userId]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$result || !$result['employer_id']) {
                error_log("Employer ID not found in employers table for user_id: " . $userId);
                return ['success' => false, 'message' => 'Employer ID not found for the user'];
            }

            $employerId = $result['employer_id'];
            error_log("Found employer_id: " . $employerId . " for user_id: " . $userId);

            // Step 2: Fetch job listings from job_posts where employer_id matches
            $stmt = $this->conn->prepare("SELECT * FROM job_posts WHERE employer_id = ?");
            $stmt->execute([$employerId]);
            $jobListings = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!$jobListings) {
                error_log("No job listings found for employer_id: " . $employerId);
            }

            return [
                'success' => true,
                'data' => $jobListings,
            ];
        } catch (PDOException $e) {
            error_log("Database error in getEmployerJobListings: " . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error fetching job listings'
            ];
        } catch (Exception $e) {
            error_log("General error in getEmployerJobListings: " . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error fetching job listings'
            ];
        }
    }

    private function saveEmployerDetailsToDb($data, $userId)
    {
        $stmt = $this->conn->prepare("INSERT INTO employers (user_id, company_name, location, company_description) VALUES (?, ?, ?, ?)");
        return $stmt->execute([
            $userId,
            $data['companyName'],
            $data['location'],
            $data['companyDescription']
        ]);
    }
    public function checkEmployerDetails()
    {
        session_start();
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        $stmt = $this->conn->prepare("SELECT employer_id FROM employers WHERE user_id = ?");
        $stmt->execute([$userId]);
        $employer = $stmt->fetch();

        return ['success' => true, 'hasDetails' => $employer !== false];
    }
}
