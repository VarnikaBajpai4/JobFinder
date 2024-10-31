<?php
// controllers/UserController.php

require_once __DIR__ . '/../config/database.php';

class UserController {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function signup($data) {
        $name = $data['name'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $role = $data['role'];

        $stmt = $this->conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$name, $email, $password, $role])) {
            return ['success' => true, 'message' => 'Signup successful'];
        } else {
            return ['success' => false, 'message' => 'Signup failed'];
        }
    }

    public function login($data) {
        $email = $data['email'];
        $password = $data['password'];

        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['role'] = $user['role']; // Store the user's role in session
            return ['success' => true, 'message' => 'Login successful'];
        } else {
            return ['success' => false, 'message' => 'Invalid email or password'];
        }
    }

    public function logout() {
        session_start();
        session_unset();    // Unset all session variables
        session_destroy();  // Destroy the session
        return ['success' => true, 'message' => 'Logged out successfully'];
    }
}
