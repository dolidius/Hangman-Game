// CANVAS DECLARATIONS
var canvas = document.getElementById("hangman");
var ctx = canvas.getContext("2d");

// DRAW 3 STARTING LINES FOR HANGMAN GAME
ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(50, 140);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(160,50);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(160,50);
ctx.lineTo(160, 80);
ctx.stroke();


//HARDCODED WORDS FOR GAME
const words = ["javascript", "react", "angular", "python", "ember", "nodejs", "java", "jquery", "vue", "django", "redux", "swift",   "typescript", "kotlin"]; 

const word = document.querySelector('.word');  //WORD CONTAINER
let randomWord, wordLetters; //VARIABLES TO HANDLE ONE RANDOM WORD FROM WORDS ARRAY

function chooseWord(){ 

    // TAKE RANDOM WORD FROM ARRAY
    randomWord = words[Math.floor(Math.random() * words.length)];

    // MAKE ARRAY OF EVERY CHARACTER FROM CHOSEN WORD
    wordLetters = randomWord.split('');  

    
    // CREATE DOM ELEMENT FOR EACH CHARACTER FROM SELECTED WORD
    for(let i in wordLetters){

        // div class="letter-box"
        let letterBox = document.createElement("div");
        letterBox.classList.add('letter-box');

        //span class="word-letter"
        let wordLetter = document.createElement("span");
        wordLetter.classList.add('word-letter');
        wordLetter.textContent = wordLetters[i];

        //ADD CREATED ELEMENTS TO DOM
        letterBox.appendChild(wordLetter);
        word.appendChild(letterBox);            
    }

}

chooseWord();

const letters = document.querySelectorAll('.letter'); //EVERY WORD FROM ALPHABET
letters.forEach(letter => letter.addEventListener('click', hangman));

// BUTTONS THAT RESET GAME
const playagain = document.querySelector('#playagain');
const resetButton = document.querySelector('#reset');
playagain.addEventListener('click', reset);
resetButton.addEventListener('click', reset);

const wordChars = document.querySelectorAll('.word-letter'); //DOM ELEMENTS THAT WAS CREATED IN JS
const popup = document.querySelector('#popup'); //POPUP THAT WILL BE SHOW AFTER USER END THE GAME
const result = document.querySelector('#result'); //IFNO WHERE USER CAN SEE IF HE WON OR LOST

// MAKE 1ST LETTER VISIBLE
wordChars[0].style.opacity = "1";
wordChars[0].style.visibility = "visible";

let mistakes = 0; //MAX 6

function hangman(){

    // CHECK WHETHER WORD INCLUDE CLICKED LETTER
    if(wordLetters.includes(this.textContent.toLowerCase())){

        // MAKE CHOSEN LETTER VISIBLE
        wordChars.forEach(wordChar => {
            if(wordChar.textContent.toLowerCase() === this.textContent.toLowerCase()){
                wordChar.style.visibility = "visible";
                wordChar.style.opacity = "1";
            }
        });

        // MAKE CLICKED LETTER UNVISIBLE
        this.style.opacity = "0";
        this.style.visibility = "hidden";

        if(Array.from(wordChars).every(guessed)){
            // CHANGE RESULT TO WIN
            result.innerHTML = "YOU WIN";
            result.style.color = "green";

            // MAKE POPUP VISIBLE
            popup.style.visibility = "visible";
            popup.style.opacity = "1";
        }
        
    }else{
        mistakes ++;
        
        // DRAW PART OF HANGMAN FOR EACH MISTAKE
        switch(mistakes){
            case 1: {
                // HEAD
                ctx.beginPath();
                ctx.arc(160, 90, 10, 0, 2 * Math.PI);
                ctx.stroke();
                break;
            }

            case 2: {
                // BODY
                ctx.beginPath();
                ctx.moveTo(160, 100);
                ctx.lineTo(160, 115);
                ctx.stroke();
                break;
            }

            case 3: {
                // LEFT HAND
                ctx.beginPath();
                ctx.moveTo(160, 105);
                ctx.lineTo(180, 115);
                ctx.stroke();
                break;
            }

            case 4: {
                // RIGHT HAND
                ctx.beginPath();
                ctx.moveTo(160, 105);
                ctx.lineTo(140, 115);
                ctx.stroke();
                break;
            }

            case 5: {
                // LEFT LEG
                ctx.beginPath();
                ctx.moveTo(160, 115);
                ctx.lineTo(190, 130);
                ctx.stroke();
                break;
            }

            // LOSE GAME
            case 6: {
                // RIGHT LEG
                ctx.beginPath();
                ctx.moveTo(160, 115);
                ctx.lineTo(130, 130);
                ctx.stroke();

                // CHANGE RESULT TO LOSE
                result.innerHTML = "YOU LOSE";
                result.style.color = "red";

                // MAKE POPUP VISIBLE
                popup.style.visibility = "visible";
                popup.style.opacity = "1";

                break;
            }

        }

        // MAKE CLICKED LETTER UNVISIBLE
        this.style.opacity = "0";
        this.style.visibility = "hidden";
    }
}


// FUNCTION THAT RESET GAME
function reset(){
    location.reload();
}

// FUNCTION THAT CHECK WHETHER USER GUESSED ALL CHARACTERS
function guessed(element){
    return element.style.opacity === "1";
}