<?php
// controllers/EmployerController.php

require_once __DIR__ . '/../config/database.php';

class EmployerController {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function saveEmployerDetails($data, $files) {
        // Validate required fields using the updated field names
        if (empty($data['companyName']) || empty($data['jobTitle']) || empty($data['jobDescription']) || empty($data['location']) || empty($data['workArrangement']) || empty($data['experienceYears'])) {
            return ['success' => false, 'message' => 'All fields are required.'];
        }

        // Handle company logo upload
        $companyLogo = $files['company_logo'] ?? null; // Update this line if the logo is included in the form
        if ($companyLogo && $companyLogo['error'] === 0) {
            $companyLogoPath = $this->uploadFile($companyLogo, 'company_logos');
            if (!$companyLogoPath) {
                return ['success' => false, 'message' => 'Failed to upload company logo.'];
            }
        } else {
            $companyLogoPath = null; // Logo is optional
        }

        // Get user_id from session
        session_start();
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        // Save employer details
        if ($this->saveEmployerDetailsToDb($data, $companyLogoPath, $userId)) {
            return ['success' => true, 'message' => 'Employer details saved successfully.'];
        } else {
            return ['success' => false, 'message' => 'Failed to save employer details.'];
        }
    }

    private function saveEmployerDetailsToDb($data, $companyLogoPath, $userId)
    {
        $stmt = $this->conn->prepare("INSERT INTO employers (user_id, company_name, job_title, job_description, location, work_arrangement, experience_years) VALUES (?, ?, ?, ?, ?, ?, ?)");
        return $stmt->execute([
            $userId,
            $data['companyName'], // Updated key name
            $data['jobTitle'],    // Updated key name
            $data['jobDescription'], // Updated key name
            $data['location'],     // Updated key name
            $data['workArrangement'], // Updated key name
            $data['experienceYears'], // Updated key name

        ]);
    }

    private function uploadFile($file, $folder) {
        $targetDir = __DIR__ . '/../uploads/' . $folder . '/';
        $targetFile = $targetDir . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            return $targetFile;
        }
        return false;
    }
}
