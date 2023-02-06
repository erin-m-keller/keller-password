/* initialize variables */
var upperArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var specialArr = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "?", "/", "-", ":", ";", "[", "]", "{", "}", ".", "<", ">", "=", "_", "`", "|", "~"];
var numericArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var generatedArr = [];

/* get references to the #generate element */
var generateBtn = document.querySelector("#generate");

/* add event listener to generate button */
generateBtn.addEventListener("click", writePassword);

/* get character length */
function getCharLength() {

  /* initialize prompt */
  var charLength = parseInt(prompt('Enter the number of characters you would like for your password. (Minimum 8 - Maximum 128)'))
  
  /* display prompt until user enters a valid character limit */
  while(charLength < 8 || charLength > 128) {
    alert("You must select a character limit with a minimum of 8 characters, or a maximum of 128.")
    charLength = parseInt(prompt('Enter the number of characters you would like for your password. (Minimum 8 - Maximum 128)'));
  }

  /* return the users choice to the original function that triggered this function */
  return charLength;
}

function getCharType() {

  /* initialize prompts */
  var charFlag = false;

  /* display prompt until user has selected at least one character type */
  while (charFlag === false) {
    lowerChar = prompt('Would you like lowercase characters? (Y/N)');
    upperChar = prompt('Would you like uppercase characters? (Y/N)');
    numericChar = prompt('Would you like numeric characters? (Y/N)');
    specialChar = prompt('Would you like special characters? (Y/N)');

    /* check if one character type is selected, if it is then break the loop. otherwise, display alert and prompts again */
    if (lowerChar.toUpperCase() != "Y" && upperChar.toUpperCase() != "Y" && numericChar.toUpperCase() != "Y" && specialChar.toUpperCase() != "Y") {
      alert("You must select at least one character type to continue.")
    } else {
      /* ends the loop */
      charFlag = true;
    }
  }
  /* return the users choice to the original function that triggered this function */
  var charArr = [
    {
      name: "lowerCase",
      value: lowerChar.toUpperCase()
    },
    {
      name: "upperCase",
      value: upperChar.toUpperCase()
    },
    {
      name: "numeric",
      value: numericChar.toUpperCase()
    },
    {
      name: "special",
      value: specialChar.toUpperCase()
    }
  ];
  return charArr;
}

/**
 * shuffles array in place
 * referenced shuffle function
 * from stackoverflow:
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
 function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* generate the password based on user input: character length, lower/upper/numeric/special */
function generatePassword() {

  var charLength = getCharLength();
  var charType = getCharType();
  var lowerCaseFlag = charType[0].value;
  var upperCaseFlag = charType[1].value;
  var numericFlag = charType[2].value;
  var specialCharFlag = charType[3].value;
  var numElemsNeed = charLength - generatedArr.length;
  /* 
   * referenced Math.floor(Math.random() * array.length); 
   * from stackoverflow: 
   * https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array 
   * 
   */

  /* pull a random numeric value from the numeric array if user wanted a numeric value and add to generated array */
  if (numericFlag === "Y") {
    var randomNumeric = Math.floor(Math.random() * numericArr.length);
    var numericVal = numericArr[randomNumeric];
    generatedArr.push(numericVal);
  }

  /* pull a random special character from the special array if user wanted a special character and add to generated array */
  if (specialCharFlag === "Y") {
    var randomSpecial = Math.floor(Math.random() * specialArr.length);
    var specialVal = specialArr[randomSpecial];
    generatedArr.push(specialVal);
  }

  if (lowerCaseFlag === "Y" && upperCaseFlag === "Y") {
    /* generate random lowercase values for half the needed number of characters */
    for (var i = 0; i < (numElemsNeed / 2); i++) {
      var lowerCase = Math.floor(Math.random() * lowerArr.length);
      var lowerVal = lowerArr[lowerCase];
      generatedArr.push(lowerVal);
    }
    /* generate random uppercase values for half the needed number of characters */
    for (var j = 0; j < (numElemsNeed / 2); j++) {
      var upperCase = Math.floor(Math.random() * upperArr.length);
      var upperVal = upperArr[upperCase];
      generatedArr.push(upperVal);
    }
  } else if (lowerCaseFlag === "Y" && upperCaseFlag === "N") {
    /* generate random lowercase values for the needed number of characters */
    for (var k = 0; k < numElemsNeed; k++) {
      var lowerCase = Math.floor(Math.random() * lowerArr.length);
      var lowerVal = lowerArr[lowerCase];
      generatedArr.push(lowerVal);
    }
  } else if (lowerCaseFlag === "N" && upperCaseFlag === "Y") {
    /* generate random uppercase values for the needed number of characters */
    for (var l = 0; l < numElemsNeed; l++) {
      var upperCase = Math.floor(Math.random() * upperArr.length);
      var upperVal = upperArr[upperCase];
      generatedArr.push(upperVal);
    }
  } else {
    /* user did not specify upper or lowercase so generate lowercase */
    for (var m = 0; m < (numElemsNeed / 2); m++) {
      var lowerCase = Math.floor(Math.random() * lowerArr.length);
      var lowerVal = lowerArr[lowerCase];
      generatedArr.push(lowerVal);
    }
  }
  /* shuffle array and return string to write password function */
  var password = shuffle(generatedArr);
  return password.join("");
}

/* write password to the #password input */
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
