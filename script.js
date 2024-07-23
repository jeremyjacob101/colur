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

// script.js

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const button = document.getElementById('testingJSbutton');
  const output = document.getElementById('outputText');

  if (button) {
    console.log('Button found');
    
    button.addEventListener('click', async () => {
      console.log('Button clicked');

      try {
        const response = await fetch('/api/text');
        if (response.ok) {
          const data = await response.json();
          output.innerText = data.text;
        } else {
          console.error('Failed to retrieve text', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  } else {
    console.error('Button not found');
  }
});
