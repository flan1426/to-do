<?php
    require 'config.php';

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Extract task ID from the POST data
        $taskId = $_POST['id'];

        // Prepare SQL statement
        $stmt = $conn->prepare("UPDATE tasks SET is_done = 1 WHERE id = ?");
        $stmt->bind_param("i", $taskId);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }
    } else {
        http_response_code(405);  // Method Not Allowed
    }
?>
