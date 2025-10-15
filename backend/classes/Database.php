<?php

class Database {
    private static ?PDO $pdo = null;

    public static function getConnection(): ?PDO {
        if (self::$pdo === null) {
            try {
                self::$pdo = new PDO(
                    "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
                    DB_USER,
                    DB_PASS,
                    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                );
            } catch (PDOException $e) {
                Logger::log('Database connection error', $e->getMessage());
                return null;
            }
        }
        return self::$pdo;
    }
}
