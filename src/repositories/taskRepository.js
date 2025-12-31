class task {
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

    getTask = async (page) => {
        try {
            const tasks = await fetch(`http://localhost:3000/api/task/pagination/${page}`);
            return this.parseResponse(tasks);
        } 
        catch (error) {
            // res.status(500).json({ success: false, message: error.message });
            console.log(error);
        }
    }
}

module.exports = new task();