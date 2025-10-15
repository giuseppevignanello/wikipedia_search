<?php

$envPath = '../.env';
if (!file_exists($envPath)) {
    die(".env file not found");
}

$env = parse_ini_file($envPath);

// Base de datos
define('DB_HOST', $env['DB_HOST'] ?? '127.0.0.1');
define('DB_NAME', $env['DB_NAME'] ?? 'wikipedia_search');
define('DB_USER', $env['DB_USER'] ?? 'root');
define('DB_PASS', $env['DB_PASS'] ?? '');
define('DB_CHARSET', $env['DB_CHARSET'] ?? 'utf8mb4');
