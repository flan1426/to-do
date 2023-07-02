<?php
    require 'config.php';

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE DATE(due_time) = CURDATE()");
    
    // Execute the statement
    $stmt->execute();
    
    // Get the result
    $result = $stmt->get_result();
    
    // Fetch all tasks as an associative array
    $tasks = $result->fetch_all(MYSQLI_ASSOC);
    
    // Output tasks as JSON
    echo json_encode($tasks);
?>
