<?php
require_once 'config.php';
require_once 'classes/Database.php';
require_once 'classes/Logger.php';
require_once 'classes/Response.php';
require_once 'classes/SearchHistory.php';

// Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$pdo = Database::getConnection();
if (!$pdo) {
    Response::error('Error during database connection', 500);
}

$historyService = new SearchHistory($pdo);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
    if ($action === 'getHistory') {
        $history = $historyService->getRecent();
        Response::json(['success' => true, 'history' => $history]);
    }
    Response::error('Not valid action', 400);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) Response::error('Invalid data');

    $action = $input['action'] ?? '';

    switch ($action) {
        case 'save':
            $term = trim($input['searchTerm'] ?? '');
            if ($historyService->save($term)) {
                Response::json(['success' => true, 'message' => 'Search saved']);
            } else {
                Response::error('Search not saved', 500);
            }
            break;

        case 'log':
            Logger::log($input['message'] ?? '', $input['error'] ?? '');
            Response::json(['success' => true]);
            break;

        default:
            Response::error('Not valid action', 400);
            break;
    }
}
