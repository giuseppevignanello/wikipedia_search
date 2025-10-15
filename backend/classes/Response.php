<?php

class Response {
    public static function json(array $data, int $code = 200): void {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }

    public static function error(string $message, int $code = 400): void {
        self::json(['success' => false, 'error' => $message], $code);
    }
}
