document.addEventListener("DOMContentLoaded", function() {
    const lists = document.querySelectorAll(".todolist");

    // User validation
    const username = "mukund";
    const password = "mukund123";
    let authenticated = false;

    // Function to prompt for username and password
    function promptCredentials() {
        const enteredUsername = prompt("Enter username:");
        const enteredPassword = prompt("Enter password:");

        if (enteredUsername === username && enteredPassword === password) {
            authenticated = true;
        } else {
            alert("Invalid credentials. Access denied.");
        }
    }

    // Check if the user is authenticated before allowing access
    if (!authenticated) {
        promptCredentials();
    }

    // Function to add a task to a list
    function addTask(list, taskText) {
        const newRow = list.querySelector("tbody").insertRow();
        newRow.innerHTML = `<td><input type="checkbox"></td><td>${taskText}</td>`;
    }

    // Function to mark a task as done
    function markDone(checkbox) {
        const taskRow = checkbox.parentElement.parentElement;
        const taskTextCell = taskRow.querySelector("td:last-child");

        if (checkbox.checked) {
            taskTextCell.style.textDecoration = "line-through";
        } else {
            taskTextCell.style.textDecoration = "none";
        }
    }

    // Add task event listeners
    lists.forEach(list => {
        const addIcon = document.createElement("span");
        addIcon.className = "add-task";
        addIcon.innerText = "+";
        addIcon.addEventListener("click", () => {
            if (authenticated) {
                const taskText = prompt("Enter task:");
                if (taskText) {
                    addTask(list, taskText);
                }
            } else {
                alert("Access denied. Please provide valid credentials.");
                promptCredentials();
            }
        });

        const th = list.querySelector("th");
        th.appendChild(addIcon);

        list.addEventListener("change", (event) => {
            if (event.target.type === "checkbox") {
                markDone(event.target);
            }
        });
    });

    // Add new list event listener
    const addListButton = document.getElementById("addListButton");
    let newListNumber = lists.length + 1; // Keep track of the new list number

    addListButton.addEventListener("click", () => {
        if (authenticated) {
            const newList = document.createElement("table");
            newList.className = "todolist";
            const newListId = "list" + newListNumber;
            newList.id = newListId;
            newList.innerHTML = `
                <thead>
                    <tr>
                        <th colspan="2">List ${newListNumber}</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>`;

            const lastList = document.querySelector(".todolist:last-child");
            lastList.parentNode.insertBefore(newList, lastList.nextSibling);

            const newAddIcon = document.createElement("span");
            newAddIcon.className = "add-task";
            newAddIcon.innerText = "+";
            newAddIcon.addEventListener("click", () => {
                const taskText = prompt("Enter task:");
                if (taskText) {
                    addTask(newList, taskText);
                }
            });

            const newTh = newList.querySelector("th");
            newTh.appendChild(newAddIcon);

            newList.addEventListener("change", (event) => {
                if (event.target.type === "checkbox") {
                    markDone(event.target);
                }
            });

            // Increment the new list number for the next list
            newListNumber++;
        } else {
            alert("Access denied. Please provide valid credentials.");
            promptCredentials();
        }
    });
});
