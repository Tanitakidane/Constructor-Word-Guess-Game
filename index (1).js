var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";


var Presidents= [
"John Adams",
"John Quincy Adams",
"Chester Alan Arthur",
"James Buchanan",
"George Herbert Walker Bush",
"George Walker Bush",
"James Earl Carter, Jr.",
"Grover Cleveland",
"William Jefferson Clinton",
"Calvin Coolidge",
"Dwight David Eisenhower",
"Millard Fillmore",
"Gerald Rudolph Ford",
"James Abram Garfield",
"Ulysses Simpson Grant",
"Warren Gamaliel Harding",
"Benjamin Harrison",
"William Henry Harrison",
"Rutherford Birchard Hayes",
"Herbert Clark Hoover",
"Andrew Jackson",
"Thomas Jefferson",
"Andrew Johnson",
"Lyndon Baines Johnson",
"John Fitzgerald Kennedy",
"Abraham Lincoln",
"James Madison",
"William McKinley",
"James Monroe",
"Richard Milhous Nixon",
"Barack Obama",
"Franklin Pierce",
"James Knox Polk",
"Ronald Wilson Reagan",
"Franklin Delano Roosevelt",
"Theodore Roosevelt",
"William Howard Taft",
"Zachary Taylor",
"Harry S. Truman",
"Donald John Trump",
"John Tyler",
"Martin Van Buren",
"George Washington",
"Woodrow Wilson",
];

var randomIndex = Math.floor(Math.random() * Presidents.length);
var randomWord = Presidents[randomIndex];
r
var computerWord = new Word(randomWord);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic() {

  if (requireNewWord) {

    var randomIndex = Math.floor(Math.random() * Presidents.length);
    var randomWord = Presidents[randomIndex];

    computerWord = new Word(randomWord);

    requireNewWord = false;
  }

  var wordComplete = [];
  computerWord.objArray.forEach(completeCheck);

  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A-Z!",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nPlease try again!\n");
          theLogic();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nAlready Guessed or Nothing Entered\n");
            theLogic();
          } else {

            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log("\nCorrect!\n");

              correctLetters.push(input.userinput);
            }

            computerWord.log();

            console.log("Guesses Left: " + guessesLeft + "\n");

            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            if (guessesLeft > 0) {
              theLogic();
            } else {
              console.log("Sorry, you lose!\n");

              restartGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log("YOU WIN!\n");

    restartGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "Play Again") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        theLogic();
      } else {
        return;
      }
    });
}

theLogic();
