const editButton = document.getElementById('edit-username-button');
const container = document.getElementById('edit-username-container');
const form = document.getElementById('edit-username-form');
const cancelButton = document.getElementById('cancel-button');
const logoutButton = document.getElementById('logout-account-button');
const deleteButton = document.getElementById('delete-account-button');

// Get base url
const CONFIG = {
    API_BASE_URL: window.location.origin 
};

editButton.addEventListener('click', () => {
    container.hidden = false;
    form.style.display = 'flex';
    editButton.disabled = true;

    const input = document.getElementById('username-input');
    input.focus();
});

cancelButton.addEventListener('click', () => {
    container.hidden = true;
    form.style.display = 'none';
    editButton.disabled = false;
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.getElementById('username-input');
    // fetch ke api buat update username
    // refresh page

    container.hidden = true;
    form.style.display = 'none';
    editButton.hidden = false;
});

logoutButton.addEventListener('click', async () => {
    await fetch(`${CONFIG.API_BASE_URL}/auth/logout`, {
        method: 'DELETE',
        credentials: 'include'
    });

    window.location.href = '/login';
});

deleteButton.addEventListener('click', async () => {
    const response = await fetch(`${CONFIG.API_BASE_URL}/auth/account`, {
        method: 'DELETE',
        credentials: 'include'
    });

    console.log(response);

    // window.location.href = '/login';
});