const signUpFormHandler = async (event) => {
    event.preventDefault();
    const user_name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

if (username && password) {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name, password}),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        //fix location file
        document.location.replace("/home");
    } else {
        alert(response.statusText)
    }
   }
};

document.querySelector('#signUpButton').addEventListener('click', signUpFormHandler);