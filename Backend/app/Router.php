<?php
// app/Router.php

require_once __DIR__ . '/../controllers/UserController.php';

class Router {
    public function handleRequest() {
        // Decode JSON data from the request body if Content-Type is application/json
        $input = json_decode(file_get_contents('php://input'), true);
        $action = $input['action'] ?? '';



        $userController = new UserController();

        switch ($action) {
            case 'signup':
                return $userController->signup($input);
            case 'login':
                return $userController->login($input);
            case 'logout':
                return $userController->logout();
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}
