const editButton = document.getElementById('edit-username-button');
const container = document.getElementById('edit-username-container');
const form = document.getElementById('edit-username-form');
const cancelButton = document.getElementById('cancel-button');
const logoutButton = document.getElementById('logout-account-button');
const deleteButton = document.getElementById('delete-account-button');
const avatar = document.getElementById('avatar-button');
const image = document.getElementById('profile-avatar');

// Get base url
const CONFIG = {
    API_BASE_URL: window.location.origin 
};

avatar.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Invalid image file');
      return;
    }

    // Tinggal fetch api dari sini. kirim ke cloud storange dan update image_link ke cloud storage yang baru
    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });

  fileInput.click();
});

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