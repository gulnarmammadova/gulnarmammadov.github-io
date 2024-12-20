const userList = JSON.parse(window.localStorage.getItem('users'))
console.log(userList);

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()

    const [email, password] = [...e.target.querySelectorAll('input')]

    const user = userList.find(user => user.mail == email.value)

    console.log(user);
    

    if (!user) {
        alert('User not found with this email!!')
        return        
    }

    if (!(user.password == password.value)) {
        alert('Your password is wrong!!')      
    }

    window.localStorage.setItem('active-user', JSON.stringify(user))
    window.location.href = '/index.html'

})