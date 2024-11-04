<?php
// controllers/EmployerController.php

require_once __DIR__ . '/../config/database.php';

class EmployerController {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function saveEmployerDetails($data) {
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
    public function checkEmployerDetails() {
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
