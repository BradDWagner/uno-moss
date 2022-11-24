const newUser = async (event) => {
    event.preventDefault();

    const username = document.getElementById('#username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application.json'
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create account.');
        }
    }
};