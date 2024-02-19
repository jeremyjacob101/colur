function changeColor() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    let red, green, blue;

    userRGBLow = document.getElementById('rgbLowSlider').value; // Default value for RGB Low
    userRGBHigh = document.getElementById('rgbHighSlider').value; // Default value for RGB High

    let rgbLow = parseInt(userRGBLow);
    let rgbHigh = parseInt(userRGBHigh);

    if (rgbLow > rgbHigh) {
        rgbTemp = rgbLow;
        rgbLow = rgbHigh;
        rgbHigh = rgbTemp;
    }

    // Update color circle's RGB values
    rgbCircleLow = rgbLow;
    rgbCircleHigh = rgbHigh;

    let rgbMultiplier = ((rgbHigh + 1) - rgbLow);

    if ((hours >= 0 && hours < 2) || (hours >= 12 && hours < 14)) {
        red = rgbHigh;
        green = Math.round(((1 - (((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * rgbMultiplier) + rgbLow);
        blue = rgbLow;
    } else if ((hours >= 2 && hours < 4) || (hours >= 14 && hours < 16)) {
        red = rgbHigh;
        green = rgbLow;
        blue = Math.round((((((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * rgbMultiplier) + rgbLow);
    } else if ((hours >= 4 && hours < 6) || (hours >= 16 && hours < 18)) {
        red = Math.round(((1 - (((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * rgbMultiplier) + rgbLow);
        green = rgbLow;
        blue = rgbHigh;
    } else if ((hours >= 6 && hours < 8) || (hours >= 18 && hours < 20)) {
        red = rgbLow;
        green = Math.round((((((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * rgbMultiplier) + rgbLow);
        blue = rgbHigh;
    } else if ((hours >= 8 && hours < 10) || (hours >= 20 && hours < 22)) {
        red = rgbLow;
        green = rgbHigh;
        blue = Math.round(((1 - (((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * rgbMultiplier) + rgbLow);
    } else {
        red = Math.round((((((hours % 2) * 3600) + (minutes * 60) + seconds) / 7200) * rgbMultiplier) + rgbLow);
        green = rgbHigh;
        blue = rgbLow;
    }

    const newColor = [red, green, blue];

    // Update the current color only if it changes:
    if (!currentColor.every((value, index) => value === newColor[index])) {
        currentColor = newColor;

        // Example usage:
        let rgbToFind = currentColor;
        let closestColorName = closestColor(rgbToFind, custom_colors);

        console.log('Closest Color:', closestColorName);

        square.style.backgroundColor = `rgb(${currentColor.join(',')})`;
        rgbValueElement.innerText = `RGB: (${currentColor.join(', ')})`;
        hexValueElement.innerText = `HEX: ${rgbToHex(currentColor)}`;
        nameValueElement.innerText = `${closestColor(currentColor, custom_colors)}`;
        lastColorChangeTime = now;
    }
}
