document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('testingJSbutton');
    const output = document.getElementById('outputText');

    const rgbHighSlider = document.getElementById('rgbHighSlider');
    const rgbLowSlider = document.getElementById('rgbLowSlider');

    if (button) {
        button.addEventListener('click', async () => {
            const rgbHighValue = parseInt(rgbHighSlider.value);
            const rgbLowValue = parseInt(rgbLowSlider.value);

            try {
                const response = await fetch(`/api/text?rgbHigh=${rgbHighValue}&rgbLow=${rgbLowValue}`);
                if (response.ok) {
                    const data = await response.json();
                    output.innerText = data.text;
                } else {
                    const errorData = await response.json();
                    output.innerText = errorData.message;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
