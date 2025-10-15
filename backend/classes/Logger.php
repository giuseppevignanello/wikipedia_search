<?php

// I'm using a custom logger file to show the errors. The fallback is the classig PHP logger
class Logger {
    private const LOG_FILE = __DIR__ . '/../error-log.txt';

    public static function log(string $message, string $error = ''): void {
        $line = sprintf("[%s] %s | %s\n", date('Y-m-d H:i:s'), $message, $error);
        file_put_contents(self::LOG_FILE, $line, FILE_APPEND | LOCK_EX);
    }
}
