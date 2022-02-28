
//NOTE TO FUTURE SELF: Fix needed to make sure both guess and Exclude letters are mutually exclusive content. 

//Creating Array of wordle solutions from the JSON file
let arr = [];
fetch("wordle.json")
  .then(response => response.json())
  .then(data =>{
    arr = data.wordleWords
  })

//Declaring used variables
let type = "guess";
let color = "lightgreen";
let letterPos = 1;
let exclusion = [];
let greenChar = [".", ".", ".", ".", "."];
let yellowChar = [".", ".", ".", ".", "."];


function changeToYellow() {
  color = "yellow";
  document.getElementById("yellow").style.outline = "3px black solid";
  document.getElementById("green").style.outline = "1px white solid";
}

function changeToGreen() {
  color = "lightgreen";
  document.getElementById("yellow").style.outline = "1px white solid";
  document.getElementById("green").style.outline = "3px black solid";
}

function changeToGuess() {
  type = "guess";
  document.getElementById("guess").style.outline = "3px black solid";
  document.getElementById("excludebut").style.outline = "1px white solid";
  document.getElementById("exclude").style.backgroundColor = "white";
}

function changeToExclude() {
  type = "exclude";
  document.getElementById("excludebut").style.outline = "3px black solid";
  document.getElementById("guess").style.outline = "1px white solid";
  document.getElementById("exclude").style.backgroundColor = "lightgray";
}

//put in the asterick in the guess list and blue backgroundColor
function asterick() {

  if (type === "guess") {
    let tempColor = color;
    color = "lightblue";
    guess(".");
    color = tempColor;
  }
}

//Inputs letters from the button keyboard
function inputLetter(inputLetter) {

  if (type === "guess") {
    guess(inputLetter);
  } else {
    exclude(inputLetter);
  }

}

//fills out the guess table
function guess(guessLetter) {
  let posOne = document.getElementById("1");
  let posTwo = document.getElementById("2");
  let posThree = document.getElementById("3");
  let posFour = document.getElementById("4");
  let posFive = document.getElementById("5");

  if (letterPos === 1) {
    posOne.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";
    posOne.style.backgroundColor = color;
    letterPos++;
    if (color == "lightgreen") { greenChar[0] = guessLetter; }
    if (color === "yellow") { yellowChar[0] = guessLetter; }

  } else if (letterPos === 2) {
    posTwo.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";;
    posTwo.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") { greenChar[1] = guessLetter; }
    if (color === "yellow") { yellowChar[1] = guessLetter; }

  } else if (letterPos === 3) {
    posThree.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";;
    posThree.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") { greenChar[2] = guessLetter; }
    if (color === "yellow") { yellowChar[2] = guessLetter; }

  } else if (letterPos === 4) {
    posFour.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";;
    posFour.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") { greenChar[3] = guessLetter; }
    if (color === "yellow") { yellowChar[3] = guessLetter; }

  } else if (letterPos === 5) {
    posFive.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";;
    posFive.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") { greenChar[4] = guessLetter; }
    if (color === "yellow") { yellowChar[4] = guessLetter; }
  }

}

//fills out the excluded letters list
function exclude(excludeLetter) {
  let ex = document.getElementById("exclude");
  let exclusionList = "Exclude Letters: ";

  if ((!exclusion.includes(excludeLetter)) && (!greenChar.includes(excludeLetter)) && (!yellowChar.includes(excludeLetter))) {
    exclusion.push(excludeLetter);
  }

  for (let i = 0; i < exclusion.length; i++) {
    exclusionList += exclusion[i].toUpperCase() + " ";
  }

  ex.innerHTML = exclusionList;

}

//deletes letters from the guess or excluded letters list. Called when hitting the DEL button.
function deleteLetter() {
  let posOne = document.getElementById("1");
  let posTwo = document.getElementById("2");
  let posThree = document.getElementById("3");
  let posFour = document.getElementById("4");
  let posFive = document.getElementById("5");
  let ex = document.getElementById("exclude");

  if (type === "guess") {
    if (letterPos === 2) {
      posOne.innerHTML = "<h3>_</h3>";
      posOne.style.backgroundColor = "white";
      letterPos--;
      greenChar[0] = ".";
      yellowChar[0] = ".";
    } else if (letterPos === 3) {
      posTwo.innerHTML = "<h3>_</h3>";
      posTwo.style.backgroundColor = "white";
      letterPos--;
      greenChar[1] = ".";
      yellowChar[1] = ".";
    } else if (letterPos === 4) {
      posThree.innerHTML = "<h3>_</h3>";
      posThree.style.backgroundColor = "white";
      letterPos--;
      greenChar[2] = ".";
      yellowChar[2] = ".";
    } else if (letterPos === 5) {
      posFour.innerHTML = "<h3>_</h3>";
      posFour.style.backgroundColor = "white";
      letterPos--;
      greenChar[3] = ".";
      yellowChar[3] = ".";
    } else if (letterPos === 6) {
      posFive.innerHTML = "<h3>_</h3>";
      posFive.style.backgroundColor = "white";
      letterPos--;
      greenChar[4] = ".";
      yellowChar[4] = ".";
    }
  } else {
    let exclusionList = "Exclude Letters: ";
    exclusion.pop()
    for (let i = 0; i < exclusion.length; i++) {
      exclusionList += exclusion[i].toUpperCase() + " ";
    }

    ex.innerHTML = exclusionList;
  }
}


//Function called when enter button.  Turns the green letter and exclusion arrays into regular expressions. 
function submit() {
  let solutionArr = [];
  let solution = document.getElementById("solution");
  let greenCharString = "";

  for (let i = 0; i < greenChar.length; i++) {
    greenCharString += greenChar[i];
  }

  const greenCharEx = new RegExp(greenCharString);
  let excludedString = "";

  for (let i = 0; i < exclusion.length; i++) {
    excludedString += exclusion[i];
  }

  const excludeEx = new RegExp("[" + excludedString + "]")



  //checks to see if the word contains green chars and doesn't contain excluded words.
  for (let i = 0; i < arr.length; i++) {
    if ((greenCharEx.test(arr[i])) && (!excludeEx.test(arr[i]))) {

      //checks to see if word contains yellow chars.
      let secondCheck = true;
      for (let j = 0; j < yellowChar.length; j++) {

        if (yellowChar[j] != ".") {

          if (!arr[i].includes(yellowChar[j])) {
            secondCheck = false;

          }
        }


      }
      if (secondCheck) {
        solutionArr.push(arr[i].toUpperCase());
      }
    }

  }

  //displays solution
  let solutionString = "";

  //limits number of solutions on screen.
  if (solutionArr.length < 11) {
    for (let i = 0; i < solutionArr.length; i++) {

      solutionString += "<p>" + solutionArr[i] + "</p>";

    }
  } else {
    for (let i = 0; i < 10; i++) {

      solutionString += "<p>" + solutionArr[i] + "</p>";

    }
  }
  solution.innerHTML = solutionString;

}
