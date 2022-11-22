const loginFormHandler = async (event) => {
    event.preventDefault();

    // const email = document.querySelector("???").value.trim();
    // const password = document.querySelector('???').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            
        })
    }
}