//login

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#userEmail").value.trim();
    const password = document.querySelector('#userPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        }); 
        if (response.ok) {
           document.location.replace('/profile');  
        } else {
            alert(response.statusText);
        }
    }
};


//sign up functionality

const signUpFormHandler = async (event) => {
    event.preventDefault();
//need proper element name
    // const name = document.querySelector('#???').value.trim();
    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPassword').value.trim();

if (name && email && password) {
    const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ name, email, password}),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        //fix location file
        document.location.replace("/???");
    } else {
        alert(response.statusText)
    }
   }
};

document.querySelector('#loginButton').addEventListener('submit', loginFormHandler);

document.querySelector('#signUpbutton').addEventListener('click', signUpFormHandler);