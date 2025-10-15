<?php

// All the query are prepared to prevent SQL injection
class SearchHistory {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function save(string $term): bool {
        if (empty($term) || strlen($term) > 255) {
            Response::error('Invalid search word');
        }

        $stmt = $this->db->prepare(
            "INSERT INTO search_history (search_term, search_date, ip_address)
            VALUES (:search_term, NOW(), :ip_address)"
        );

        $stmt->bindParam(':search_term', $term, PDO::PARAM_STR);
        
        // For now I save the user ip address (binding it before)
        // In the future with an ipotetical auth feature we should save
        // an user reference such as id or uuid
        $stmt->bindParam(':ip_address', $_SERVER['REMOTE_ADDR'], PDO::PARAM_STR);

        return $stmt->execute();
    }

    public function getRecent(int $limit = 20): array {
        $stmt = $this->db->prepare(
            "SELECT DISTINCT search_term, MAX(search_date) AS search_date
            FROM search_history
            GROUP BY search_term
            ORDER BY search_date DESC
            LIMIT :limit"
        );
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
