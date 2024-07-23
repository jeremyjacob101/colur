// script.js

document.getElementById('testingJSbutton').addEventListener('click', async () => {
    const response = await fetch('/api/text');

    if (response.ok) {
        const data = await response.json();
        document.getElementById('outputText').innerText = data.text;
    } else {
        alert('Failed to retrieve text');
    }
});
