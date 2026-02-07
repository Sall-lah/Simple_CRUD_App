const deleteButton = document.getElementById('delete-button');

const CONFIG = {
    API_BASE_URL: window.location.origin 
}

deleteButton.addEventListener('click', async () => {
    const taskId = deleteButton.dataset.taskId;
    try{
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/task/delete`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId })
        });
        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
    location.reload();
});