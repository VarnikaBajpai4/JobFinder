<?php
// app/Router.php

require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/EmployerController.php';

class Router
{
    public function handleRequest()
    {
        // Access action and other fields directly from $_POST
        $action = $_POST['action'] ?? ''; // Access action from POST data
        error_log("POST data: " . print_r($_POST, true));
        error_log("FILES data: " . print_r($_FILES, true));

        $userController = new UserController();
        $employerController = new EmployerController();

        switch ($action) {
            case 'signup':
                return $userController->signup($_POST);
            case 'login':
                return $userController->login($_POST);
            case 'logout':
                return $userController->logout();
            case 'saveEmployerDetails':
                return $employerController->saveEmployerDetails($_POST, $_FILES);
            case 'job_seeker_details':
                return $userController->jobSeekerDetails($_POST, $_FILES); 
            case 'checkAuth':
                session_start();
                if (isset($_SESSION['user_id'])) {
                    $response = [
                        'success' => true,
                        'user' => [
                            'user_id' => $_SESSION['user_id'],
                            'role' => $_SESSION['role'],
                        ],
                    ];
                } else {
                    $response = ['success' => false];
                }
                return $response;
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}
