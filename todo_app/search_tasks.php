<?php
    require 'config.php';

    // Check if the request method is GET
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Extract the search query from the GET parameters
        $searchQuery = $_GET['query'];

        // Prepare SQL statement with a LIKE clause to search for tasks
        $stmt = $conn->prepare("SELECT * FROM tasks WHERE text LIKE ?");
        $stmt->bind_param("s", "%".$searchQuery."%");

        // Execute the statement
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        // Fetch all matched tasks as an associative array
        $tasks = $result->fetch_all(MYSQLI_ASSOC);

        // Output tasks as JSON
        echo json_encode(["success" => true, "tasks" => $tasks]);
    } else {
        http_response_code(405);  // Method Not Allowed
    }
?>
