function changeColor() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    let red, green, blue;

    if ((hours >= 0 && hours < 2) || (hours >= 12 && hours < 14)) {
        red = 255;
        green = Math.round((1 - (((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * 255);
        blue = 0;
    } else if ((hours >= 2 && hours < 4) || (hours >= 14 && hours < 16)) {
        red = 255;
        green = 0;
        blue = Math.round(((((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * 255);
    } else if ((hours >= 4 && hours < 6) || (hours >= 16 && hours < 18)) {
        red = Math.round((1 - (((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * 255);
        green = 0;
        blue = 255;
    } else if ((hours >= 6 && hours < 8) || (hours >= 18 && hours < 20)) {
        red = 0;
        green = Math.round(((((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * 255);
        blue = 255;
    } else if ((hours >= 8 && hours < 10) || (hours >= 20 && hours < 22)) {
        red = 0;
        green = 255;
        blue = Math.round((1 - (((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * 255);
    } else {
        red = Math.round(((((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * 255);
        green = 255;
        blue = 0;
    }

    const newColor = [red, green, blue];

    // Update the current color only if it changes
    if (!currentColor.every((value, index) => value === newColor[index])) {
        currentColor = newColor;

        // Example usage:
        let rgbToFind = currentColor;
        let closestColorName = closestColor(rgbToFind, custom_colors);

        console.log('Closest Color:', closestColorName);

        square.style.backgroundColor = `rgb(${currentColor.join(',')})`;
        rgbValueElement.innerText = `RGB: ${currentColor.join(', ')}`;
        hexValueElement.innerText = `HEX: ${rgbToHex(currentColor)}`;
        nameValueElement.innerText = `NAME: ${closestColor(currentColor, custom_colors)}`;
        lastColorChangeTime = now;
    }
}
