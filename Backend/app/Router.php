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
        //error_log("FILES data: " . print_r($_FILES, true));
        if($action!=='checkAuthEmployer'){
            error_log("Incoming action: " . print_r($action, true));
        }

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
            case 'checkAuthJobSeeker':
                session_start();
                if (isset($_SESSION['user_id'])) {
                    // Check if the role is job_seeker
                    if ($_SESSION['role'] === 'job_seeker') {
                        $response = [
                            'success' => true,
                            'user' => [
                                'user_id' => $_SESSION['user_id'],
                                'role' => $_SESSION['role'],
                            ],
                        ];
                    } else {
                        // Role is not job_seeker
                        $response = [
                            'success' => true,
                            'user' => [
                                'role' =>'a',
                            ],
                        ];
                    }
                } else {
                    // User ID is not set
                    $response = ['success' => false];
                }
                return $response;

            case 'checkAuthEmployer':
                session_start();
                if (isset($_SESSION['user_id'])) {
                    // Check if the role is employer
                    if ($_SESSION['role'] === 'employer') {
                        $response = [
                            'success' => true,
                            'user' => [
                                'user_id' => $_SESSION['user_id'],
                                'role' => $_SESSION['role'],
                            ],
                        ];
                    } else {
                        // Role is not employer
                        $response = [
                            'success' => true,
                            'user' => [
                                'role' =>'a',
                            ],
                        ];
                    }
                } else {
                    // User ID is not set
                    $response = ['success' => false];
                }
                return $response;

            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}
