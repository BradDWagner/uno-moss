//login

const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        }); 
        console.log(response.ok)
        if (response.ok) {
           document.location.replace('/home');  
        } else {
            redirect("/");
        }
    }
};


//sign up functionality

const signUpFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

if (username && password) {
    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password}),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        //fix location file
        document.location.replace("/newUser.handlebars");
    } else {
        alert(response.statusText)
    }
   }
};

document.querySelector('#loginButton').addEventListener('submit', loginFormHandler);

document.querySelector('#signUpbutton').addEventListener('click', signUpFormHandler);