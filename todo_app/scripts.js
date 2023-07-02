function addTask() {
    let taskText = document.getElementById("task").value;
    let dueTime = document.getElementById("dueTime").value;
    
    // Validate inputs
    if (!taskText || !dueTime) {
        alert("Please enter task text and due time.");
        return;
    }

    // Send a POST request to add_task.php
    fetch('add_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `text=${encodeURIComponent(taskText)}&due_time=${encodeURIComponent(dueTime)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Clear the input fields
            document.getElementById("task").value = "";
            document.getElementById("dueTime").value = "";
            
            // Refresh tasks
            getTasks();
        } else {
            alert(`Failed to add task: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add task.');
    });
}

function deleteTask(taskId) {
    // Send a POST request to delete_task.php
    fetch('delete_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${encodeURIComponent(taskId)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Refresh tasks
            getTasks();
        } else {
            alert(`Failed to delete task: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete task.');
    });
}

function getTasks() {
    // Send a GET request to get_tasks.php
    fetch('get_tasks.php')
        .then(response => response.json())
        .then(data => {
            // Clear the task list
            let taskList = document.getElementById("todo-list");
            taskList.innerHTML = "";

            // Add each task to the list
            data.forEach(task => {
                let listItem = document.createElement("li");

                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.is_done;
                checkbox.onchange = function() {
                    completeTask(task.id);
                };

                let text = document.createElement("span");
                text.className = "todo-text";
                text.textContent = task.text;

                let dueTime = document.createElement("span");
                dueTime.className = "todo-time";
                dueTime.textContent = task.due_time;

                let deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Delete";
                deleteButton.onclick = function() {
                    deleteTask(task.id);
                };

                listItem.appendChild(checkbox);
                listItem.appendChild(text);
                listItem.appendChild(dueTime);
                listItem.appendChild(deleteButton);

                taskList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to get tasks.');
        });
}

function completeTask(taskId) {
    // Send a POST request to complete_task.php
    fetch('complete_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${encodeURIComponent(taskId)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Refresh tasks
            getTasks();
        } else {
            alert(`Failed to complete task: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to complete task.');
    });
}

window.onload = getTasks;

// Attach addTask function to the add button
document.getElementById("add-task").addEventListener("click", addTask);
function searchTasks() {
    const searchQuery = document.getElementById("search-query").value;
  
    // Send a GET request to search_tasks.php
    fetch(`search_tasks.php?query=${encodeURIComponent(searchQuery)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Clear the task list
          const taskList = document.getElementById("todo-list");
          taskList.innerHTML = "";
  
          // Add each matched task to the list
          data.tasks.forEach((task) => {
            const listItem = document.createElement("li");
            listItem.textContent = task.text;
            taskList.appendChild(listItem);
          });
        } else {
          alert(`Failed to search tasks: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to search tasks.");
      });
  }
  
  // Attach searchTasks function to the search button
  document.getElementById("search-button").addEventListener("click", searchTasks);
  