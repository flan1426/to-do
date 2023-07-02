<?php
    require 'config.php';

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Extract task details from the POST data
        $taskText = $_POST['text'];
        $dueTime = $_POST['due_time'];

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO tasks (text, due_time) VALUES (?, ?)");
        $stmt->bind_param("ss", $taskText, $dueTime);

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
