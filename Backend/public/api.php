<?php
// public/api.php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../app/Router.php';

$router = new Router();
$response = $router->handleRequest();

echo json_encode($response);
