
const header = `
<div class="logo">Flix.id</div>
<div class="navbar">
    <nav>
        <ul>
            <li><a href="#">Movie</a></li>
            <li><a href="#">Series</a></li>
            <li><a href="#">Originals</a></li>
        </ul>
    </nav>
    <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input class="hidden" type="text" placeholder="Search...">
    </div>
</div>
<a class="login-btn">Login</a>
<div class="profile-button hidden">
    <div class="has-drop">
        <a class="user-name"></a>
        <div class="drop">
            <button class="logout-btn">Logout</button>
            <button class="logout-btn">Logout</button>
            <button class="logout-btn">Logout</button>
        </div>
    </div>
</div>
<div class="mobile-btns">
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    </button>
    <button>
        <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M9 0a9 9 0 0 0-9 9 8.654 8.654 0 0 0 .05.92 9 9 0 0 0 17.9 0A8.654 8.654 0 0 0 18 9a9 9 0 0 0-9-9zm5.42 13.42c-.01 0-.06.08-.07.08a6.975 6.975 0 0 1-10.7 0c-.01 0-.06-.08-.07-.08a.512.512 0 0 1-.09-.27.522.522 0 0 1 .34-.48c.74-.25 1.45-.49 1.65-.54a.16.16 0 0 1 .03-.13.49.49 0 0 1 .43-.36l1.27-.1a2.077 2.077 0 0 0-.19-.79v-.01a2.814 2.814 0 0 0-.45-.78 3.83 3.83 0 0 1-.79-2.38A3.38 3.38 0 0 1 8.88 4h.24a3.38 3.38 0 0 1 3.1 3.58 3.83 3.83 0 0 1-.79 2.38 2.814 2.814 0 0 0-.45.78v.01a2.077 2.077 0 0 0-.19.79l1.27.1a.49.49 0 0 1 .43.36.16.16 0 0 1 .03.13c.2.05.91.29 1.65.54a.49.49 0 0 1 .25.75z"/>
        </svg>
    </button>
    <button class="menu-btn"><i class="fa-solid fa-bars"></i></button>
</div>
<div class="mobile-menu hidden">
    <button class="xmark">✖</button>
    <div class="menu-container">
        <div class="user-button"></div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/">Home</a></li>
        </ul>
    </div>
</div>`;

// Inject Header
document.querySelector('header').innerHTML = header;

// Dynamic Links
const currentPage = window.location.pathname.slice(1);
const loginPage = currentPage === 'index.html' ? './assets/pages/login.html' : 'login.html';
const profilePage = currentPage === 'index.html' ? './assets/pages/profile.html' : 'profile.html';

document.querySelector('.login-btn').setAttribute('href', loginPage);
document.querySelector('.user-name').setAttribute('href', profilePage);

// Mobile Menu Handlers
const mobileMenu = document.querySelector('.mobile-menu');
document.querySelector('.mobile-menu .xmark').addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.querySelector('.container').style.overflow = 'auto';
});
document.querySelector('.menu-btn').addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    document.querySelector('.container').style.overflow = 'hidden';
});

// Search Bar Logic
let isSearchActive = false;
document.querySelector('.search-bar svg').addEventListener('click', () => {
    const navElement = document.querySelector('nav');
    if (!isSearchActive) {
        isSearchActive = true;
        navElement.innerHTML = `<input placeholder="Search a movie" />`;
    } else {
        const searchValue = document.querySelector('header input').value;
        alert(searchValue);
    }
});
