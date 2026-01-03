// Get base url
const CONFIG = {
    API_BASE_URL: window.location.origin 
};

// Make post request to api
const addTask = async (taskName, taskDescription, dueDate) => {
    try {
        const tasks = await fetch(`${CONFIG.API_BASE_URL}/api/task/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskName, taskDescription, dueDate })
        });
        return this.parseResponse(tasks);
    }
    catch (error) {
        console.log(error);
    }
}

// Get DOM Element
const taskDescription = document.getElementById("taskDescription");
const taskDueDate = document.getElementById("taskDueDate");
const submitBtn = document.getElementById("submitBtn");

// Call function that send request when the input is valid and submit button is clicked
submitBtn.addEventListener("click", async() => {
    const taskNameValue = taskName.value;
    const taskDescriptionValue = taskDescription.value;
    const taskDueDateValue = taskDueDate.value;
    const currentDate = new Date();

    if(taskNameValue !== '' && taskDescriptionValue !== '' && taskDueDateValue !== '' && new Date(taskDueDateValue) > currentDate) {
        // Hide form input
        for(i = 0; i < 4; i++) {
            document.getElementsByClassName("form-row")[i].style.display = "none";
        }

        // Display Success message
        const successDisplay = document.getElementById("form-success");
        successDisplay.style.display = "flex";

        // await addTask(taskName, taskDescription, taskDueDate);
        // const data = await task.addTask(taskName, taskDescription, taskDueDate);
        console.log({taskNameValue, taskDescriptionValue, taskDueDateValue});
    }
});

// Name input validation
taskName.addEventListener("input", () => {
    const taskNameValue = taskName.value;
    const invalidNameFeedback = document.getElementById("invalid-name-feedback");
    if(taskNameValue === '') {
        taskName.style.border = "1px solid red";
        // taskNameInput.style.outlineColor = "red";
        invalidNameFeedback.style.display = "block";
    } else {
        taskName.style.border = "none";
        // taskNameInput.style.outlineColor = "black";
        invalidNameFeedback.style.display = "none";
    }
})

// Description input validation
taskDescription.addEventListener("input", () => {
    const taskDescriptionValue = taskDescription.value;
    const invalidDescriptionFeedback = document.getElementById("invalid-description-feedback");
    if(taskDescriptionValue === '') {
        taskDescription.style.border = "1px solid red";
        // taskDecsriptionInput.style.outlineColor = "red";
        invalidDescriptionFeedback.style.display = "block";
    } else {
        taskDescription.style.border = "none";
        // taskDecsriptionInput.style.outlineColor = "black";
        invalidDescriptionFeedback.style.display = "none";
    }
})

// Date input validation
taskDueDate.addEventListener("input", () => {
    const currentDate = new Date();
    const taskDueDateValue = taskDueDate.value;
    const invalidDateFeedback = document.getElementById("invalid-date-feedback");

    if(taskDueDateValue === '' || new Date(taskDueDateValue) < currentDate) {
        taskDueDate.style.border = "1px solid red"
        // taskDateInput.style.outlineColor = "red";
        invalidDateFeedback.style.display = "block";
    } else {
        taskDueDate.style.border = "none"
        // taskDateInput.style.outlineColor = "black";
        invalidDateFeedback.style.display = "none";
    }
})

