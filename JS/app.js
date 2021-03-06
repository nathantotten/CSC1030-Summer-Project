// ----------  ----------

myStorage = window.sessionStorage;

// ---------- Function to handle sounds ----------

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

// ---------- Initialise sounds ----------

var countdownAudio = new sound("mp3/clock-ticking-4.mp3");
var timeUpAudio = new sound("mp3/alarm-clock-01.mp3");

// ---------- Initialise player inputs array ----------

var wordArray = [];

// ---------- Defining arrays for characters responding to different points groups ----------

let onePointChars = ["A", "E", "I", "L", "N", "O", "R", "S", "T", "U"];
let twoPointsChars = ["D", "G"];
let threePointsChars = ["B", "C", "M", "P"];
let fourPointsChars = ["F", "H", "V", "W", "Y"];
let fivePointsChars = ["K"];
let eightPointsChars = ["J", "X"];
let tenPointsChars = ["Q", "Z"];

// ---------- Initialise player score ----------

function newGameScore() {
    myStorage.setItem('playerScore', 0);  
    myStorage.setItem('words', [""]);
}

try {
    myStorage.getItem('playerScore');
} catch (error) {
    myStorage.setItem('playerScore', 0);
}

// ---------- Define consonants and vowels ----------

myStorage.setItem('consonants', 'BCDFGHJKLMNPQRSTVWXYZ');
myStorage.setItem('vowels', 'AEIOU');

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
    clearInterval(interval)

    
    var target_date = new Date().getTime() + ((minutes * 60 ) * 1000); // set the countdown date
    

    clearTimeout(timeOut)

    timeOut = setTimeout(
        function() 
        {
          openScorePage();
          inputBox.disabled = true;
          submitButton.disabled = true;
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



// ---------- Populating character cards ----------

const cards = document.querySelectorAll(".card")
const cardsArray = Array.from(cards)
const inputBox = document.getElementById("input-box")
var cardInFocus;
var chars = "";
myStorage.setItem('count', 0);

// console.log(cardInFocus.innerHTML)

// By default, start with focus on the first card
function populateCard(char) {
    var cardCount = myStorage.getItem('count');
    cardInFocus = cardsArray[cardCount]
    cardInFocus.innerHTML = char
    chars = chars.concat(char);
    if (cardCount == 9) {
        inputBox.disabled = false;
        submitButton.disabled = false;
        startTimer(0.5)
        countdownAudio.play();
    }
    cardCount++
    myStorage.setItem('count', cardCount);
}

// ---------- Generation of random vowels and consonants ----------

// Generate a random consonant.

function randomConsonant() {
    // Define an empty string for the randomly selected character.
    var randCons = '';
    // Retrieve all consonants from session storage.
    let consonants = myStorage.getItem('consonants');
    // Update the random consonant string with a character selected
    //  at random from the string of consonants.
    randCons += consonants.charAt(Math.floor(Math.random() * consonants.length))
    // Call the function to display the character in the next available card.
    populateCard(randCons)
}

// Generate a random vowel.

function randomVowel() {
    // Functions identically to randomConsonant() except
    //  characters are retrieved from a string of the available vowels.
    var randVowel = '';
    let vowels = myStorage.getItem('vowels');
    randVowel += vowels.charAt(Math.floor(Math.random() * vowels.length))
    populateCard(randVowel)
}



// ---------- Validating user input ----------

const submitButton = document.getElementById("submit-btn")

function checkInput() {
    let validWord = true;
    // Retrieve user input
    let inputVal = document.getElementById("input-box").value;
    // Retrieve characters from cards
    // Check if characters from cards include user input characters
    if (inputVal.length === 0) {
        validWord = false
        alert('Inavlid input! - You must enter a valid word.')
        document.getElementById("input-box").value = "";
    }

    for (var i = 0; i < inputVal.length; i++) {

        // Check each character of the input word against the letters given to the player.
        let comparisonChar = inputVal.charAt(i);

        // Check if the input only uses characters from the cards.
        if (!(chars.includes(comparisonChar))) {
            validWord = false;

            // Alert the player if they used an invalid character
            alert("Invalid word! - You used a character not present on the board.")

            // Clear the input field for easier input of new word.
            document.getElementById("input-box").value = '';

            // Break the loop as there is no point looking at the rest of the input word if one character is wrong.
            break;
        }

        // For a character c, count how many times that character appears in the available characters
        //  and how many times it is used in the user's input.
        //  Users input must use character c <= number of times as it appears in the list of available characters.

        let appearencesInChars = countAppearances(chars, comparisonChar);
        let appearancesInInput = countAppearances(inputVal, comparisonChar);

        if (appearancesInInput > appearencesInChars) {
            validWord = false;
            
            // Alert the player if they used a character too many times.
            alert("Invalid word! - You used a character too many times.", comparisonChar)
            
            // Clear the input field for easier input of new word.
            document.getElementById("input-box").value = '';

            // Break the loop as there is no point looking at the rest of the input word if one character is wrong.
            break;
        }

        document.getElementById("input-box").value = "";

    }

    if (searchStringInArray(inputVal, wordArray)) {
        validWord = false;
        alert("Invalid word! - This word has already been input.")
    }

    if (validWord) {
        // Record the length of the input word.
        var points = 0;

        for (var i = 0; i < inputVal.length; i++) {
            comparisonChar = inputVal.charAt(i);
            // Add 1 point if char in one point char array.
            if (searchStringInArray(comparisonChar, onePointChars)) {
                points += 1;
            }
            // Add 2 points if char in two points char array.
            else if (searchStringInArray(comparisonChar, twoPointsChars)) {
                points += 2;
            }
            // Add 3 points if char in 3 points char array.
            else if (searchStringInArray(comparisonChar, threePointsChars)) {
                points += 3;
            }
            // Add 4 points if char in 4 points char array.
            else if (searchStringInArray(comparisonChar, fourPointsChars)) {
                points += 4;
            }
            // Add 5 points if char in 5 points char array.
            else if (searchStringInArray(comparisonChar, fivePointsChars)) {
                points += 5;
            }
            // Add 8 points if char in 8 points char array.
            else if (searchStringInArray(comparisonChar, eightPointsChars)) {
                points += 8;
            }
            // Add 10 points if char in 10 points char array.
            else if (searchStringInArray(comparisonChar, tenPointsChars)) {
                points += 10;
            }
        }

        // Bonus points for longer words.
        if (inputVal.length >= 5) {
            // If a word is greater than 5 letters, add an additional 5 points to the score for that word.
            points += 5;
        }

        // Add the calculated points value to the player score.
        let currentScore = parseInt(myStorage.getItem('playerScore'));
        let updatedScore = currentScore + points;
        myStorage.setItem('playerScore', updatedScore);

        // Add the word itself to an array to be displayed later.
        wordArray.push(inputVal);
        myStorage.setItem('words', JSON.stringify(wordArray));

    }

}

// Count how many times a character appears in a string.
function countAppearances(string,char) {
    var re = new RegExp(char, "gi");
    // Return the number of times char appears in string
    return string.match(re).length;
}

// ---------- Displaying the user score ----------

function openScorePage() {
    window.location = 'scoreboard.html';
}

function playAlarm() {
    timeUpAudio.play();
    timeUp = setTimeout(function(){timeUpAudio.stop()}, 1750);

}

function displayScore() {
    let scoreSpan = document.getElementById("score-span");
    let score = myStorage.getItem('playerScore');
    scoreSpan.innerText = score;
}

function displayWords() {
    let wordsDisplay = document.getElementById("words")
    let validWords = JSON.parse(myStorage.getItem('words'));
    validWords.forEach(element => {
        wordsDisplay.innerText += element + "\n";
    });

}

// Search a String array for a given string.
function searchStringInArray(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] === str) return true;
    }
    return false;
}

