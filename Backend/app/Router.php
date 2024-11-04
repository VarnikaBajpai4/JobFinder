<?php
// app/Router.php

require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/EmployerController.php';
require_once __DIR__ . '/../controllers/JobController.php';

class Router {
    public function handleRequest() {
        $action = $_POST['action'] ?? $_GET['action'] ?? ''; // Allow both POST and GET for flexibility
        $userController = new UserController();
        $employerController = new EmployerController();
        $jobController = new JobController();
        
        error_log("POST data: " . print_r($_POST, true));
        
        if ($action !== 'checkAuthEmployer') {
            error_log("Incoming action: " . print_r($action, true));
        }

        switch ($action) {
            case 'signup':
                return $userController->signup($_POST);
            case 'login':
                return $userController->login($_POST);
            case 'logout':
                return $userController->logout();
            case 'saveEmployerDetails':
                return $employerController->saveEmployerDetails($_POST);
            case 'job_seeker_details':
                return $userController->jobSeekerDetails($_POST, $_FILES);
            case 'checkAuthStatus':
                return $userController->checkAuthStatus();
            case 'getJobListings':
                return $jobController->getJobListings();
            case 'checkEmployerDetails':
                return $employerController->checkEmployerDetails();
            case 'checkJobSeekerDetails':
                return $userController->checkJobSeekerDetails();
            case 'getEmployerJobListings':  // New case for fetching employer-specific job listings
                return $employerController->getEmployerJobListings();
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}
