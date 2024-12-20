const header = `                <div class="logo">Flix.id</div>
                <div class="navbar">
                    <nav>
                        <ul>
                            <li><a href="#">Movie</a></li>
                            <li><a href="#">Series</a></li>
                            <li><a href="#">Originals</a></li>
                        </ul>
                    </nav>
                    <div class="search-bar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input class="hidden" type="text" placeholder="Search...">
                    </div>
                </div>
                <a  class="login-btn">Login</a>

                <div class='profile-button hidden' >

                <div class="has-drop" >
                <a  class="user-name "></a>
                <div class="drop" >
                    <button class="logout-btn " >Logout</button>
                    <button class="logout-btn " >Logout</button>
                    <button class="logout-btn " >Logout</button>
                </div>

                </div>
                </div>


                <div>
                <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                </button>
                <button class="menu-btn" ><i class="fa-solid fa-bars"></i></button></div>


                                <div class="mobile-menu hidden">
                                <button class="xmark" >✖</button>
                    <div class="menu-container" >

                        <div class="user-button">

                        </div>

                        <ul>
                        
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Home</a>
                            </li>
                        </ul>

                        <div></div>

                    </div>
                </div>

                `

document.querySelector('header').innerHTML = header


let loginPage = window.location.pathname.slice(1) == 'index.html' ? "./assets/pages/login.html" : "login.html"
let profilePage = window.location.pathname.slice(1) == 'index.html' ? "./assets/pages/profile.html" : "profile.html"
document.querySelector('.login-btn').setAttribute('href', loginPage)
document.querySelector('.user-name').setAttribute('href', profilePage)


document.querySelector('.mobile-menu .xmark').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.add('hidden')
    document.querySelector('.container').style.overflow = 'auto'
})
document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.remove('hidden')
    document.querySelector('.container').style.overflow = 'hidden'

})

let isActiveSearch = false

document.querySelector('.search-bar svg').addEventListener('click', () => {
    if (!isActiveSearch) {
        isActiveSearch = true
        document.querySelector('nav').innerHTML = `
    <input placeholder="Search a movie" />
    `
    } else {
        alert(document.querySelector('header input').value)
    }
})



