<?php
// Backend/public/download.php

$fileName = $_GET['file'] ?? null;
$filePath = __DIR__ . '/../uploads/resumes/' . basename($fileName);

// Check if the file exists
if ($fileName && file_exists($filePath)) {
    // Set headers to force download
    header('Content-Description: File Transfer');
    header("Access-Control-Allow-Origin: http://localhost:5173");

    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);
    exit;
} else {
    http_response_code(404);
    echo "File not found.";
    exit;
}
