<?php
// app/Router.php

require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/EmployerController.php';

class Router
{
    public function handleRequest()
    {
        // You can access $_POST and $_FILES directly
        error_log(print_r($_POST, true)); // Log the $_POST data
        error_log(print_r($_FILES, true)); // Log the $_FILES data

        $action = $_POST['action'] ?? ''; // Get the action from the POST data

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
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}
