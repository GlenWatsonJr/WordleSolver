//Creating Array of wordle solutions from the JSON file
let arr = [];
fetch("wordle.json")
  .then((response) => response.json())
  .then((data) => {
    arr = data.wordleWords;
  });

//Declaring used variables
let type = "guess";
let color = "lightgreen";
let letterPos = 1;
let exclusionArray = [];
let greenCharArray = [".", ".", ".", ".", "."];
let yellowCharArray = [".", ".", ".", ".", "."];

//Changes to Yellow state
function changeToYellow() {
  color = "yellow";
  document.getElementById("yellow").style.outline = "3px black solid";
  document.getElementById("green").style.outline = "1px white solid";
}

//changes to Green state
function changeToGreen() {
  color = "lightgreen";
  document.getElementById("yellow").style.outline = "1px white solid";
  document.getElementById("green").style.outline = "3px black solid";
}

//Changes to Guess state
function changeToGuess() {
  type = "guess";
  document.getElementById("guess").style.outline = "3px black solid";
  document.getElementById("excludebut").style.outline = "1px white solid";
  document.getElementById("exclude").style.backgroundColor = "white";
}

//Changes to Exclude letter state
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
  if (exclusionArray.includes(guessLetter)) {
    return;
  }

  let posOne = document.getElementById("1");
  let posTwo = document.getElementById("2");
  let posThree = document.getElementById("3");
  let posFour = document.getElementById("4");
  let posFive = document.getElementById("5");

  if (letterPos === 1) {
    posOne.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";
    posOne.style.backgroundColor = color;
    letterPos++;
    if (color == "lightgreen") {
      greenCharArray[0] = guessLetter;
    }
    if (color === "yellow") {
      yellowCharArray[0] = guessLetter;
    }
  } else if (letterPos === 2) {
    posTwo.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";
    posTwo.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") {
      greenCharArray[1] = guessLetter;
    }
    if (color === "yellow") {
      yellowCharArray[1] = guessLetter;
    }
  } else if (letterPos === 3) {
    posThree.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";
    posThree.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") {
      greenCharArray[2] = guessLetter;
    }
    if (color === "yellow") {
      yellowCharArray[2] = guessLetter;
    }
  } else if (letterPos === 4) {
    posFour.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";
    posFour.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") {
      greenCharArray[3] = guessLetter;
    }
    if (color === "yellow") {
      yellowCharArray[3] = guessLetter;
    }
  } else if (letterPos === 5) {
    posFive.innerHTML = "<h3>" + guessLetter.toUpperCase() + "</h3>";
    posFive.style.backgroundColor = color;
    letterPos++;
    if (color === "lightgreen") {
      greenCharArray[4] = guessLetter;
    }
    if (color === "yellow") {
      yellowCharArray[4] = guessLetter;
    }
  }
}

//fills out the excluded letters list
function exclude(excludeLetter) {
  let ex = document.getElementById("exclude");
  let exclusionList = "Exclude Letters: ";

  if (
    !exclusionArray.includes(excludeLetter) &&
    !greenCharArray.includes(excludeLetter) &&
    !yellowCharArray.includes(excludeLetter)
  ) {
    exclusionArray.push(excludeLetter);
  }

  for (let i = 0; i < exclusionArray.length; i++) {
    exclusionList += exclusionArray[i].toUpperCase() + " ";
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
      greenCharArray[0] = ".";
      yellowCharArray[0] = ".";
    } else if (letterPos === 3) {
      posTwo.innerHTML = "<h3>_</h3>";
      posTwo.style.backgroundColor = "white";
      letterPos--;
      greenCharArray[1] = ".";
      yellowCharArray[1] = ".";
    } else if (letterPos === 4) {
      posThree.innerHTML = "<h3>_</h3>";
      posThree.style.backgroundColor = "white";
      letterPos--;
      greenCharArray[2] = ".";
      yellowCharArray[2] = ".";
    } else if (letterPos === 5) {
      posFour.innerHTML = "<h3>_</h3>";
      posFour.style.backgroundColor = "white";
      letterPos--;
      greenCharArray[3] = ".";
      yellowCharArray[3] = ".";
    } else if (letterPos === 6) {
      posFive.innerHTML = "<h3>_</h3>";
      posFive.style.backgroundColor = "white";
      letterPos--;
      greenCharArray[4] = ".";
      yellowCharArray[4] = ".";
    }
  } else {
    let exclusionList = "Exclude Letters: ";
    exclusionArray.pop();
    for (let i = 0; i < exclusionArray.length; i++) {
      exclusionList += exclusionArray[i].toUpperCase() + " ";
    }

    ex.innerHTML = exclusionList;
  }
}

//Function called when enter button.  Turns the green letter and exclusion arrays into regular expressions.
function submit() {
  let solutionArr = [];
  let solution = document.getElementById("solution");

  let greenEx = new RegExp(arrayToRegex(greenCharArray, "normal"));
  let exclusionEx = new RegExp(arrayToRegex(exclusionArray, "bracket"));
  let yellowNormEx = new RegExp(arrayToRegex(yellowCharArray, "normal"));
  let yellowBracEx = new RegExp(arrayToRegex(yellowCharArray, "bracket"));

  //checks to see if the word contains green chars and doesn't contain excluded words.
  for (let i = 0; i < arr.length; i++) {
    //create a valid word state
    let validWord = false;

    //Checks against the green letters and excluded letters
    if (greenEx.test(arr[i]) && !exclusionEx.test(arr[i])) {
      validWord = true;
    }

    //Removes words that have the yellow letter in the same position.
    if (yellowNormEx != "/...../") {
      if (yellowNormEx.test(arr[i])) {
        validWord = false;
      }
    }

    //Checks to see if the word contains the yellow letters
    if (yellowBracEx != "/[]/") {
      if (!yellowBracEx.test(arr[i])) {
        validWord = false;
      }
    }

    if (validWord === true) {
      solutionArr.push(arr[i].toUpperCase());
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

//Takes an Array turns it into a normal or bracket Regular Expresss string
function arrayToRegex(array, type) {
  let returnString = "";
  if (type == "normal") {
    for (let i = 0; i < array.length; i++) {
      returnString += array[i];
    }
  } else {
    returnString += "[";
    for (let i = 0; i < array.length; i++) {
      if (array[i] != ".") {
        returnString += array[i];
      }
    }
    returnString += "]";
  }

  return returnString;
}
