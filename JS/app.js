sessionStorage.setItem('consonants', 'BCDFGHJKLMNPQRSTVWXYZ');
sessionStorage.setItem('vowels', 'AEIOU');

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

// Generate a random consonant.

function randomConsonant() {
    var randCons = '';
    let consonants = sessionStorage.getItem('consonants');
    randCons += consonants.charAt(Math.floor(Math.random() * consonants.length))
    updatedConsonants = consonants.replace(randCons, '');
    sessionStorage.setItem('consonants', updatedConsonants);    // console.log(randCons)
    return randCons;
}

// Generate a random vowel.

function randomVowel() {
    var randVowel = '';
    let vowels = sessionStorage.getItem('vowels');
    randVowel += vowels.charAt(Math.floor(Math.random() * vowels.length))
    updatedVowels = vowels.replace(randVowel, '');
    sessionStorage.setItem('vowels', updatedVowels);
    return randVowel;
}

// Test the random consonant feature.

// random1 = randomConsonant();
// random2 = randomConsonant();
// random3 = randomConsonant();
// random4 = randomConsonant();
// random5 = randomConsonant();
// random6 = randomConsonant();
// random7 = randomConsonant();
// random8 = randomConsonant();

// remainingConsonants = sessionStorage.getItem('consonants');

// console.log(random1)
// console.log(random2)
// console.log(random3)
// console.log(random4)
// console.log(random5)
// console.log(random6)
// console.log(random7)
// console.log(remainingConsonants)

// Test the random vowel feature.

// random1 = randomVowel();
// random2 = randomVowel();
// random3 = randomVowel();

// remainingVowels = sessionStorage.getItem('vowels');

// console.log(random1)
// console.log(random2)
// console.log(random3)

// console.log('remaining vowels: ' + remainingVowels)