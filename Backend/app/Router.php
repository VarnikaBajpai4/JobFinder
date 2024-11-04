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
        //error_log("FILES data: " . print_r($_FILES, true));
        if($action!=='checkAuthEmployer'){
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
            case 'checkAuthJobSeeker':
                session_start();
                if (isset($_SESSION['user_id'])) {
                    if ($_SESSION['role'] === 'job_seeker') {
                        return [
                            'success' => true,
                            'user' => [
                                'user_id' => $_SESSION['user_id'],
                                'role' => $_SESSION['role'],
                            ],
                        ];
                    } else {
                        return ['success' => true, 'user' => ['role' => 'a']];
                    }
                } else {
                    return ['success' => false];
                }
            case 'checkAuthEmployer':
                session_start();
                if (isset($_SESSION['user_id'])) {
                    if ($_SESSION['role'] === 'employer') {
                        return [
                            'success' => true,
                            'user' => [
                                'user_id' => $_SESSION['user_id'],
                                'role' => $_SESSION['role'],
                            ],
                        ];
                    } else {
                        return ['success' => true, 'user' => ['role' => 'a']];
                    }
                } else {
                    return ['success' => false];
                }
            case 'getJobListings':
                return $jobController->getJobListings();
            case 'checkEmployerDetails':
                    return $employerController->checkEmployerDetails();
            case 'checkJobSeekerDetails':
                    return $userController->checkJobSeekerDetails();
                
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}

