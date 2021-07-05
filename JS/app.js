// Map the available themes that can be cycled through.

const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  

// Get the current theme from the doc.

const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
    localStorage.setItem('theme', tmp),
    tmp);

// Constant for the class of the body of the doc./

const bodyClass = document.body.classList;

// Add the retrieved theme to the class of the body
bodyClass.add(theme);


// Function to enable toggling between the mapped themes.

function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
}

// Set the on click property of the theme changing button to call the toggle theme function.

document.getElementById('themeButton').onclick = toggleTheme;