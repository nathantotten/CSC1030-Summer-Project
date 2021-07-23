// ----------  ----------

// ---------- Define consonants and vowels ----------

sessionStorage.setItem('consonants', 'BCDFGHJKLMNPQRSTVWXYZ');
sessionStorage.setItem('vowels', 'AEIOU');

// ---------- Theme Changer ----------

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



// ---------- Game Timer ----------

var time_limit;
var interval;
var timeOut;


// Function to start the timer
function startTimer(minutes) {

    time_limit = ((minutes * 60 ) * 1000);
    // var minutes = $( '#set-time' ).val();
    clearInterval(interval)

    
    var target_date = new Date().getTime() + ((minutes * 60 ) * 1000); // set the countdown date
    

    clearTimeout(timeOut)

    timeOut = setTimeout(
        function() 
        {
          alert( 'done' );
        }, time_limit );
      

      var hours, minutes, seconds; // variables for time units
      
      var countdown = document.getElementById("tiles"); // get tag element
      
      getCountdown();
      
      interval = setInterval(function () { getCountdown(); }, 1000);
      
      function getCountdown(){
      
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;
        
        if ( seconds_left >= 0 ) {
            console.log(time_limit);

            if ((seconds_left * 1000) > (time_limit / 2)) {
                $( '#tiles' ).removeClass('color-empty');
                $( '#tiles' ).removeClass('color-half');
                $( '#tiles' ).addClass('color-full');
            }

            if ( (seconds_left * 1000 ) < ( time_limit / 2 ) )  {
            $( '#tiles' ).removeClass('color-full');
            $( '#tiles' ).addClass('color-half');
        
                } 
            if ( (seconds_left * 1000 ) < ( time_limit / 4 ) )  {
                $( '#tiles' ).removeClass('color-half');
                $( '#tiles' ).addClass('color-empty');
            }
            
                
            hours = pad( parseInt(seconds_left / 3600) );
            seconds_left = seconds_left % 3600;
                    
            minutes = pad( parseInt(seconds_left / 60) );

            seconds = pad( parseInt( seconds_left % 60 ) );
        
            // format countdown string + set tag value
            countdown.innerHTML = "<span>" + hours + ":</span><span>" + minutes + ":</span><span>" + seconds + "</span>"; 
            
        
            
        }
         
        
        
      }
      
      function pad(n) {
          return (n < 10 ? '0' : '') + n;
      }
      

      
}

// Reset the timer/game

function reset() {
    location.reload()
    clearInterval(interval)
    clearTimeout(timeOut)
}

// ---------- Generation of random vowels and consonants ----------

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

// ---------- Testing random consonant and vowel generation ----------

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


//set actual timer

// var playButton = document.getElementById("play")
// var minutes = 0.5;

// ---------- Populating character cards ----------

const cards = document.querySelectorAll(".card")
const cardsArray = Array.from(cards)

var cardInFocus;
cardInFocus = cardsArray[0]
// console.log(cardInFocus.innerHTML)

// By default, start with focus on the first card
function populateCard(char) {

}