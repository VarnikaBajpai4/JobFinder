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
    public function checkJobSeekerDetails()
    {
        session_start();
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        $stmt = $this->conn->prepare("SELECT seeker_id FROM job_seekers WHERE user_id = ?");
        $stmt->execute([$userId]);
        $jobSeeker = $stmt->fetch();

        return ['success' => true, 'exists' => $jobSeeker !== false];
    }

    public function jobSeekerDetails($data, $files)
    {
        // Check required fields
        if (empty($data['full_name']) || empty($data['location']) || empty($data['skills'])) {
            return ['success' => false, 'message' => 'All fields are required.'];
        }

        // Handle resume upload
        $resume = $files['resume'] ?? null;
        if ($resume && $resume['error'] === 0) {
            $resumePath = $this->handleFileUpload($resume, 'resumes');
            if (!$resumePath) {
                return ['success' => false, 'message' => 'Failed to upload resume.'];
            }
        } else {
            return ['success' => false, 'message' => 'Resume is required.'];
        }

        // Convert skills to JSON
        $skillsArray = array_map('trim', explode(',', $data['skills']));
        $skillsJson = json_encode($skillsArray);

        // Get user_id from session
        session_start();
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        // Save job seeker details
        if ($this->saveJobSeekerDetails($data, $resumePath, $skillsJson, $userId)) {
            return ['success' => true, 'message' => 'Job seeker details saved successfully.'];
        } else {
            return ['success' => false, 'message' => 'Failed to save job seeker details.'];
        }
    }

    private function saveJobSeekerDetails($data, $resumePath, $skillsJson, $userId)
    {
        $stmt = $this->conn->prepare("INSERT INTO job_seekers (user_id, full_name, location, skills, resume) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([
            $userId,
            $data['full_name'],
            $data['location'],
            $skillsJson,
            $resumePath
        ]);
    }



    private function handleFileUpload($file, $folder)
    {
        $targetDir = __DIR__ . '/../uploads/' . $folder . '/';


        $targetFile = $targetDir . basename($file["name"]);
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {

            return $targetFile;
        }

        return false;
    }





    public function signup($data)
    {
        $username = $data['name']; // Keeping $username to match database field
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $role = $data['role'];

        // Update the SQL query to use username
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
            //error_log("user id of login: " . print_r($_SESSION['user_id'], true));
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
