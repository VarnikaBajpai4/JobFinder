<?php

require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/EmployerController.php';
require_once __DIR__ . '/../controllers/JobController.php';

class Router
{
    public function handleRequest()
    {
        $action = $_POST['action'] ?? $_GET['action'] ?? '';
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
            case 'getEmployerJobListings':
                return $employerController->getEmployerJobListings();
            case 'addJobListing':  
                return $jobController->addJobListing($_POST);
            case 'getJobDetails':
                return $jobController->getJobDetails($_POST['job_id']);
            case 'applyForJob':
                return $jobController->applyForJob($_POST['job_id']);
            case 'trackApplications':
                return $jobController->trackApplications();
            case 'getJobSeekerDetails':
                return $jobController->getJobSeekerDetails($_POST['seeker_id']);
            case 'updateApplicationStatus':
                $applicationId = $_POST['application_id'];
                $status = $_POST['status'];
                return $jobController->updateApplicationStatus($applicationId, $status);
            case 'getSeekerApplications':
                return $jobController->getSeekerApplications();
            case 'getJobDetailsById':
                $jobId = $_POST['job_id'] ?? null;
                return $jobController->getJobDetailsById($jobId);
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}
