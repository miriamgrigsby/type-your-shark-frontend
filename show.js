const searchparams = new URLSearchParams(window.location.search)
const query = searchparams.get('id')

fetch(`http://localhost:3000/users/${query}`)
.then(response => console.log(response.json()))
