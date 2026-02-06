class taskService {
    parseResponse = async (response) => {
        try {
            response = await response.json();
            return response;
        }
        catch (error) {
            // res.status(500).json({ success: false, message: error.message });
            console.log(error);
        }
    }

    getTask = async (page, cookie) => {
        try {
            const tasks = await fetch(`http://localhost:3000/api/task/${page}`, {
                headers: {
                    cookie: cookie
                }
            });
            return this.parseResponse(tasks);
        } 
        catch (error) {
            // res.status(500).json({ success: false, message: error.message });
            console.log(error);
        }
    }

    addTask = async (taskName, taskDescription, dueDate) => {
        try {
            console.log("test");
            const tasks = await fetch('http://localhost:3000/api/task/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({taskName, taskDescription, dueDate})
            });
            // console.log(tasks);
            return this.parseResponse(tasks);
        } 
        catch (error) {
            // res.status(500).json({ success: false, message: error.message });
            console.log(error);
        }
    }
}

module.exports = new taskService();