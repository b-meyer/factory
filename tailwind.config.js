//Colors
/* 
  https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work/54071699#54071699

  input: r,g,b in '#XXXXXX' or '#XXX'
  out: h in [0,360] and s,l in [0,1]
*/
function rgb2hsl(rgb) {
  let r, g, b;
  if (rgb.match(/^#([0-9a-f]{3})$/i)) { // check for 3 digit color
    r = parseInt(rgb.substr(1, 1) + rgb.substr(1, 1), 16) / 256;
    g = parseInt(rgb.substr(2, 1) + rgb.substr(2, 1), 16) / 256;
    b = parseInt(rgb.substr(3, 1) + rgb.substr(3, 1), 16) / 256;
  } else if (rgb.match(/^#([0-9a-f]{6})$/i)) { // check for 6 digit color
    r = parseInt(rgb.substr(1, 2), 16) / 256;
    g = parseInt(rgb.substr(3, 2), 16) / 256;
    b = parseInt(rgb.substr(5, 2), 16) / 256;
  } else {
    return [0, 0, 0];
  }
  let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = (1 - Math.abs(v + v - c - 1));
  let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
  return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
}
/*
  https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex/54014428#54014428

  input: h in [0,360] and s,l in [0,1]
  output: r,g,b in '#XXXXXX'
*/
function hsl2rgb(h, s, l) {
  let a = s * Math.min(l, 1 - l);
  let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return '#' + [f(0), f(8), f(4)].map(x => {
    let hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

//primary: "#3c4b64", // Core UI // hsl(218,25,31)
//primary: "#003f7e", // CIT // hsl(210,100,25)
let color, hsl, step, generatedColors = {},
  colors = [{ // List of List RGB hex string or HSL array with Lightness density
    step: 25,
    primary: [215, .33],
    gray: [215, .1],
  }, {
    step: 50,
    red: [0, .6],
    orange: [30, .6],
    yellow: [60, .6],
    yellowgreen: [100, .6],
    green: [140, .6],
    blue: [200, .6],
    purple: [260, .6],
  }];
for (let group = 0; group < colors.length; group++) { // Loop through color groups
  step = colors[group].step || 50;
  for (let property in colors[group]) { // Loop through the properties in group
    color = colors[group][property];// Get the color from the property name
    if (property === 'step') { // Ignore the step property
      continue; // Skip to the colors
    } else if (typeof color === 'string' && color.indexOf('#') === 0) { // Check for RGB string
      hsl = rgb2hsl(color); // Convert from RGB string to HSL array
    } else if (color.length && color.length > 1) { // Check for HSL array
      hsl = color; // Color is (hopfully) HSL array
    } else { // Incorrect format
      continue; // Skip this color
    }
    generatedColors[property] = {}; // Create an object under this property name
    for (let i = step; i < 1000; i += step) { // Loop from 50 to 950 based on step
      generatedColors[property][i] = hsl2rgb(hsl[0], hsl[1], (1000 - i) / 1000); // Set color value in RGB string, Keep Hue and Saturation but modulate Lightness
    }
  }
}

// Spacing
let spacing = {};
let scale = 16; // 16 units/rem... or 1px
for (let whole, rem, i = 0; i < 800; i++) {
  whole = Math.floor(i / scale); // Get Whole divisor
  rem = (i % scale) / scale; // Get Remainder... double check for floating point errors with your specific scale i.e. 0.1 + 0.2 != 0.3
  spacing[i] = whole + rem.toString().substring(1) + (i > 0 ? 'rem' : ''); // Only add rem if non zero
}
for (let whole, rem, i = 800; i <= 3000; i+=5) {
  whole = Math.floor(i / scale); // Get Whole divisor
  rem = (i % scale) / scale; // Get Remainder... double check for floating point errors with your specific scale i.e. 0.1 + 0.2 != 0.3
  spacing[i] = whole + rem.toString().substring(1) + (i > 0 ? 'rem' : ''); // Only add rem if non zero
}

// Configuration
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    spacing,
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      ...generatedColors,
    },
    screens: {
      'xs': '400px',
      'sm': '600px',
      'md': '800px',
      'lg': '1000px',
      'xl': '1200px',
      '2xl': '1400px',
      '3xl': '1600px',
      '4xl': '1800px',
      '5xl': '2000px'
    },
  },
  extend: {
    backgroundImage: {
      'hero-pattern': "url('/img/hero-pattern.svg')",
    }
  }
};