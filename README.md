# Wikipedia Search App

This project is a simple web application that allows users to search for terms on Wikipedia, save their search history, and view recent searches from all users. The backend is implemented in PHP with a MySQL database.

## Setup Instructions

Follow these steps to set up and run the application:

### 1. Create the Database

1. Open your SQL client.
2. Use the instruction on the SQL script `database.sql` included in the project to create the database and necessary tables.

```sql
-- Example:
CREATE DATABASE wikipedia_search;
USE wikipedia_search;

-- Execute the rest of database.sql to create tables
```

### 2. Configure Environment Variables

1. Create a file named .env in the project root.
2. Add the following content and modify it according to your environment:


```
DB_HOST=127.0.0.1
DB_NAME=wikipedia_search
DB_USER=root
DB_PASS=root
DB_CHARSET=utf8mb4
```

### 3. Create the Error Log File

In the project root, create an empty file named error-log.txt.

### 4. Run the Application

### 5. Notes
Make sure your PHP installation has PDO and the necessary database drivers enabled.

## Next steps
- Translation of errors and text for various languages 
- Clear the user history
