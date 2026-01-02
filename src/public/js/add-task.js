const CONFIG = {
    API_BASE_URL: window.location.origin 
};

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

// Tinggal error handling kalo data ada yang kurang + nampilin kalo semisal data yang dikirim udah oke
const createTask = async() => {
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDueDate = document.getElementById("taskDueDate").value;
    currentDate = new Date();

    const invalidNameFeedback = document.getElementById("invalid-name-feedback");
    const taskNameInput = document.getElementById("taskName");
    if(taskName === '') {
        taskNameInput.style.border = "1px solid red";
        // taskNameInput.style.outlineColor = "red";
        invalidNameFeedback.style.display = "block";
    } else {
        taskNameInput.style.border = "none";
        // taskNameInput.style.outlineColor = "black";
        invalidNameFeedback.style.display = "none";
    }
    

    const invalidDescriptionFeedback = document.getElementById("invalid-description-feedback");
    const taskDescriptionInput = document.getElementById("taskDescription");
    if(taskDescription === '') {
        taskDescriptionInput.style.border = "1px solid red";
        // taskDecsriptionInput.style.outlineColor = "red";
        invalidDescriptionFeedback.style.display = "block";
    } else {
        taskDescriptionInput.style.border = "none";
        // taskDecsriptionInput.style.outlineColor = "black";
        invalidDescriptionFeedback.style.display = "none";
    }

    const invalidDateFeedback = document.getElementById("invalid-date-feedback");
    const taskDateInput = document.getElementById("taskDueDate");
    if(taskDueDate === '') {
        taskDateInput.style.border = "1px solid red"
        // taskDateInput.style.outlineColor = "red";
        invalidDateFeedback.style.display = "block";
    } else {
        taskDateInput.style.border = "none"
        // taskDateInput.style.outlineColor = "black";
        invalidDateFeedback.style.display = "none";
    }

    if(taskName == '' && taskDescription !== '' && taskDueDate !== '' && new Date(taskDueDate) < currentDate) {
        // await addTask(taskName, taskDescription, taskDueDate);
        // const data = await task.addTask(taskName, taskDescription, taskDueDate);
        console.log({taskName, taskDescription, taskDueDate});
    }
    
    console.log({taskName, taskDescription, taskDueDate});
};

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", createTask);