// // script.js

// document.getElementById('testingJSbutton').addEventListener('click', async () => {
//     const response = await fetch('/api/text');

//     if (response.ok) {
//         const data = await response.json();
//         document.getElementById('outputText').innerText = data.text;
//     } else {
//         alert('Failed to retrieve text');
//     }
// });

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const button = document.getElementById('testingJSbutton');
    const output = document.getElementById('outputText');

    const rgbHighSlider = document.getElementById('rgbHighSlider');
    const rgbLowSlider = document.getElementById('rgbLowSlider');

    if (button) {
        console.log('Button found');

        button.addEventListener('click', async () => {
            console.log('Button clicked');

            const rgbHighValue = parseInt(rgbHighSlider.value);
            const rgbLowValue = parseInt(rgbLowSlider.value);

            try {
                const response = await fetch(`/api/text?rgbHigh=${rgbHighValue}&rgbLow=${rgbLowValue}`);
                if (response.ok) {
                    const data = await response.json();
                    output.innerText = data.text;
                } else {
                    const errorData = await response.json();
                    console.error('Failed to retrieve text', response.status, errorData.message);
                    output.innerText = errorData.message;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.error('Button not found');
    }
});
