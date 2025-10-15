-- Migration SQL to create database

CREATE DATABASE IF NOT EXISTS wikipedia_search
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE wikipedia_search

-- history table
CREATE TABLE search_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    search_term VARCHAR(255) NOT NULL,
    search_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) NOT NULL, 
    INDEX idx_search_date (search_date DESC),
    INDEX idx_search_term (search_term)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
