// // Simple script to handle active navigation links
// document.addEventListener('DOMContentLoaded', function () {
//     const navLinks = document.querySelectorAll('.nav-link');

//     navLinks.forEach(link => {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();

//             // Remove active class from all links
//             navLinks.forEach(item => {
//                 item.classList.remove('active');
//             });

//             // Add active class to clicked link
//             this.classList.add('active');

//             // Update header title based on clicked link
//             const linkText = this.querySelector('span').textContent;
//             document.querySelector('.header h2').textContent = linkText + ' Overview';
//         });
//     });

//     // Set current date in footer
//     const currentYear = new Date().getFullYear();
//     const copyrightElement = document.querySelector('.copyright');
//     copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
// });