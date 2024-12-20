

const userList = JSON.parse(window.localStorage.getItem('users')) || []
const backgrounds = [
    'https://www.hdwallpapers.in/download/terminator_dark_fate_movie_poster_4k_8k_hd-3840x2160.jpg',
    'https://pbs.twimg.com/media/GNjZTmsXcAEJ7Sh?format=jpg&name=4096x4096',
    'https://r1.ilikewallpaper.net/iphone-11-wallpapers/download/83132/aladdin-movie-poster-art-4k-iphone-11-wallpaper-ilikewallpaper_com_828x1792.jpg',
]



const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');
const passwordIcon = document.getElementById('password-icon');

document.querySelector('.left-section').style.background = `url(${backgrounds[0]})`

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    if (type === 'password') {
        passwordIcon.src = 'https://api.iconify.design/lucide:eye.svg';
    } else {
        passwordIcon.src = 'https://api.iconify.design/lucide:eye-off.svg';
    }
});

const form = document.querySelector('form')
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log('Form submitted');
// });
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const [firstname, lastname, email, password] = [...document.querySelectorAll('form input')]
    
    signUp(firstname.value, lastname.value, email.value, password.value)
});

const indicators = document.querySelectorAll('.indicator');
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        indicators.forEach(ind => ind.classList.remove('active'));
        indicator.classList.add('active');
        document.querySelector('.left-section').style.background = `url(${backgrounds[index]})`
    });
});



document.querySelector('.register').addEventListener('submit', e => {
    e.preventDefault()

    const [firstname, lastname, email, password] = [...document.querySelectorAll('form input')]
    const userData = {
        id: userList.length + 1, 
        fname: firstname.value, lname: lastname.value, mail: email.value, password: password.value
    }

    userList.push(userData)

    window.localStorage.setItem('users', JSON.stringify(userList))


})


