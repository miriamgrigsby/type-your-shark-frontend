const authLoginForm =  document.getElementById('auth-login')
const authSignUpForm =  document.getElementById('auth-signup')
const loginButton = document.getElementById('login-button')
const signUpButton = document.getElementById('signup-button')
const logOutButton = document.getElementById('logout-button')

// logout
if(localStorage.token){
    logOutbutton.addEventListener("click", ()=> {
        localStorage.removeItem("token")
    })
}

signUpForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const formData = new FormData(event.target)
    const username = formData.get("username")
    const password = formData.get("password")
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username,
                password
            }
        })
    })
})
// loginForm.addEventListener(‘submit’, (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target)
//     const username = formData.get(‘username’)
//     const password = formData.get(‘password’)
//     fetch(‘http://localhost:3000/login’, {
//         method: ‘POST’,
//         headers: {
//             ‘Content-Type’: ‘application/json’
//         },
//         body: JSON.stringify({
//             username,
//             password
//         })
//     })
//     .then(response => response.json())
//     .then((result) => {
//         return result.error ? alert(result.error) : localStorage.setItem(‘token’, token)
//     })
//     // .then(({token, user}) => {
//     //     localStorage.setItem(‘token’, token),
//     //     localStorage.setItem(‘user’, user)
//     // })
// })
// if only create & authenitication#login route...
// Send a POST request to
// if you’re using strong params in your backend you must pass through and object with the correct key/values