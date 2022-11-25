
const newUploadHandler = async (event) => {
    const plant_name = document.querySelector('#plant_name').value.trim();
    const location = document.querySelector('#location').value.trim();
    const description = document.querySelector('#description')
    const upload = document.querySelector('#upload');
    console.log('click')
    if (plant_name && location && description && upload) {
            console.log('all fields entered')
        const response = await fetch('/api/plants/upload', {
            method: 'POST',
            body: JSON.stringify({ plant_name, location, description}),
            // headers: {
            //     'Content-Type': "multipart/form-data"
            // }
        });
        console.log(response)

        if (response.ok) {
            console.log('success')
        }
    }
}

document 
    .querySelector('.upload-group')
    .addEventListener('submit', newUploadHandler)