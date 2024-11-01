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
        $userId = $data['user_id'];
        $companyLogo = $files['companyLogo']['name'] ? $this->uploadFile($files['companyLogo']) : null;
        $companyName = $data['companyName'];
        $description = $data['description'];
        $industry = $data['industry'];
        $phone = $data['phone'];
        $email = $data['email'];
        $website = $data['website'];
        $experienceLevel = $data['experienceLevel'];
        $workArrangement = $data['workArrangement'];

        $stmt = $this->conn->prepare("INSERT INTO employers (user_id, company_logo, company_name, description, industry, phone, email, website, experience_level, work_arrangement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt->execute([$userId, $companyLogo, $companyName, $description, $industry, $phone, $email, $website, $experienceLevel, $workArrangement])) {
            return ['success' => true, 'message' => 'Employer details saved successfully'];
        } else {
            return ['success' => false, 'message' => 'Failed to save employer details'];
        }
    }

    private function uploadFile($file) {
        $targetDir = __DIR__ . '/../uploads/';
        $targetFile = $targetDir . basename($file['name']);
        move_uploaded_file($file['tmp_name'], $targetFile);
        return $targetFile;
    }
}
