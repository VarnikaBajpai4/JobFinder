<?php
// app/Router.php

require_once __DIR__ . '/../controllers/UserController.php';

class Router {
    public function handleRequest() {
        $action = $_POST['action'] ?? '';
        $userController = new UserController();

        switch ($action) {
            case 'signup':
                return $userController->signup($_POST);
            case 'login':
                return $userController->login($_POST);
            case 'logout':
                return $userController->logout();
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
}
