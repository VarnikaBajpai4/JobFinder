<?php
// controllers/UserController.php

require_once __DIR__ . '/../config/database.php';

class UserController
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function jobSeekerDetails($data)
    {
        // Check if required fields are set
        if (empty($data['job_type']) || empty($data['location']) || empty($data['industry']) || empty($data['skills'])) {
            return ['success' => false, 'message' => 'All fields are required.'];
        }

        // Handling file uploads
        $profilePicture = $_FILES['profile_picture'] ?? null;
        $resume = $_FILES['resume'] ?? null;

        // Validate and process the uploaded files
        if ($profilePicture && $profilePicture['error'] == 0) {
            $profilePicturePath = $this->handleFileUpload($profilePicture, 'profile_pictures');
            if (!$profilePicturePath) {
                return ['success' => false, 'message' => 'Failed to upload profile picture.'];
            }
        } else {
            return ['success' => false, 'message' => 'Profile picture is required.'];
        }

        if ($resume && $resume['error'] == 0) {
            $resumePath = $this->handleFileUpload($resume, 'resumes');
            if (!$resumePath) {
                return ['success' => false, 'message' => 'Failed to upload resume.'];
            }
        } else {
            return ['success' => false, 'message' => 'Resume is required.'];
        }

        // Convert the skills string to a JSON array
        $skillsArray = array_map('trim', explode(',', $data['skills'])); // Split by comma and trim spaces
        $skillsJson = json_encode($skillsArray); // Convert to JSON

        // Retrieve the user_id from the session or input data
        session_start(); // Start the session if it's not already started
        $userId = $_SESSION['user_id'] ?? null; // Assuming the user ID is stored in the session

        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        // Save to the database
        if ($this->saveJobSeekerDetails($data, $profilePicturePath, $resumePath, $skillsJson, $userId)) {
            return ['success' => true, 'message' => 'Job seeker details saved successfully.'];
        } else {
            return ['success' => false, 'message' => 'Failed to save job seeker details.'];
        }
    }

    private function saveJobSeekerDetails($data, $profilePicturePath, $resumePath, $skillsJson, $userId)
    {
        $stmt = $this->conn->prepare("INSERT INTO job_seekers (user_id, job_type, location, industry, skills, profile_picture, resume) VALUES (?, ?, ?, ?, ?, ?, ?)");
        return $stmt->execute([
            $userId, // Include the user_id in the insert statement
            $data['job_type'],
            $data['location'],
            $data['industry'],
            $skillsJson, // Use the JSON formatted skills
            $profilePicturePath,
            $resumePath
        ]);
    }

    private function handleFileUpload($file, $folder)
    {
        // Validate file upload
        if ($file && $file['error'] === UPLOAD_ERR_OK) {
            // Define target directory
            $targetDir = __DIR__ . '/../uploads/' . $folder . '/';
            $targetFile = $targetDir . basename($file["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

            // Check file size (limit to 2MB)
            if ($file["size"] > 2000000) {
                return false; // File too large
            }

            // Allow certain file formats (for profile pictures)
            if ($folder === 'profile_pictures' && !in_array($imageFileType, ['jpg', 'png', 'jpeg', 'gif'])) {
                return false; // Invalid file format
            }

            // Attempt to move the uploaded file
            if (move_uploaded_file($file["tmp_name"], $targetFile)) {
                return $targetFile; // Return the path to the uploaded file
            }
        }
        return false; // Failed to upload
    }







    public function signup($data)
    {
        $username = $data['name']; // Keeping $username to match database field
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $role = $data['role'];

        // Update the SQL query to use `username`
        $stmt = $this->conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$username, $email, $password, $role])) {
            return ['success' => true, 'message' => 'Signup successful', 'role' => $role];
        } else {
            return ['success' => false, 'message' => 'Signup failed'];
        }
    }

    public function login($data)
    {
        $email = $data['email'];
        $password = $data['password'];

        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['role'] = $user['role'];
            return ['success' => true, 'message' => 'Login successful', 'role' => $user['role']];
        } else {
            return ['success' => false, 'message' => 'Invalid email or password'];
        }
    }

    public function logout()
    {
        session_start();
        session_unset();    // Unset all session variables
        session_destroy();  // Destroy the session
        return ['success' => true, 'message' => 'Logged out successfully'];
    }
}
