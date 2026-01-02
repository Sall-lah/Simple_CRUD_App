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
        // res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
}

// Tinggal error handling kalo data ada yang kurang + nampilin kalo semisal data yang dikirim udah oke
const createTask = async() => {
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDueDate = document.getElementById("taskDueDate").value;
    // const data = await task.addTask(taskName, taskDescription, taskDueDate);
    console.log({taskName, taskDescription, taskDueDate});
};

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", createTask);