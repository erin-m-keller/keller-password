/* initialize variables */
var upperArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var specialArr = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "?", "/", "-", ":", ";", "[", "]", "{", "}", ".", "<", ">", "=", "_", "`", "|", "~"];
var numericArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var generatedArr = [];

/* get references to element */
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");
var textToCopy = document.querySelector("#password");

/* add event listener to elements */
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyToClipboard);

/* 
 * copy password to clipboard 
 * reference from W3Schools
 * https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
 */
function copyToClipboard() {
  textToCopy.select();
  textToCopy.setSelectionRange(0, 99999); 
  navigator.clipboard.writeText(textToCopy.value);
}

/* get character length */
function getCharLength() {

  /* initialize prompt */
  var charLength = parseInt(prompt('Enter the number of characters you would like for your password. (Minimum 8 - Maximum 128)'))
  
  /* display prompt until user enters a valid character limit */
  while(charLength < 8 || charLength > 128) {
    alert("You must select a character limit with a minimum of 8 characters, or a maximum of 128.")
    charLength = parseInt(prompt('Enter the number of characters you would like for your password. (Minimum 8 - Maximum 128)'));
  }

  /* return the users choice to the @generatePassword function */
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

    /* check if one character type is selected, if it is then break the loop. otherwise, display alert and prompt(s) again */
    if (lowerChar.toUpperCase() != "Y" && upperChar.toUpperCase() != "Y" && numericChar.toUpperCase() != "Y" && specialChar.toUpperCase() != "Y") {
      alert("You must select at least one character type to continue.")
    } else {
      /* end the loop */
      charFlag = true;
    }
  }
  /* return the users criteria to the @generatePassword function */
  var charArr = [
    { value: lowerChar.toUpperCase() },
    { value: upperChar.toUpperCase() },
    { value: numericChar.toUpperCase() },
    { value: specialChar.toUpperCase() }
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

/* 
 * @generatePasswordValues
 * loop through the character arrays based on input
 * to generate the password
 */
function generatePasswordValues(num, arr, numElemsNeed) {
  /* 
   * reference (Math.floor(Math.random() * array.length)); 
   * from stackoverflow: 
   * https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array 
   * 
   */
  for (var i = 0; i < (numElemsNeed / num); i++) {
    var idx = Math.floor(Math.random() * arr.length);
    var val = arr[idx];
    generatedArr.push(val);
  }
}

/* 
 * @generatePassword
 * generate the password based on user criteria: 
 * character length, lower/upper/numeric/special 
 */
function generatePassword() {

  var charLength = getCharLength();
  var charType = getCharType();
  var lowerCaseFlag = charType[0].value;
  var upperCaseFlag = charType[1].value;
  var numericFlag = charType[2].value;
  var specialCharFlag = charType[3].value;

  if (lowerCaseFlag === "Y" && upperCaseFlag === "Y" && numericFlag === "Y" && specialCharFlag === "Y") {
    /* generate random lowercase values for 1/4 the needed number of characters */
    generatePasswordValues(4,lowerArr,charLength);
    /* generate random uppercase values for 1/4 the needed number of characters */
    generatePasswordValues(4,upperArr,charLength);
    /* generate random numeric values for 1/4 the needed number of characters */
    generatePasswordValues(4,numericArr,charLength);
    /* generate random special values for 1/4 the needed number of characters */
    generatePasswordValues(4,specialArr,charLength);
  } else if (lowerCaseFlag === "N" && upperCaseFlag === "Y" && numericFlag === "Y" && specialCharFlag === "Y") {
    /* generate random uppercase values for 1/3 the needed number of characters */
    generatePasswordValues(3,upperArr,charLength);
    /* generate random numeric values for 1/3 the needed number of characters */
    generatePasswordValues(3,numericArr,charLength);
    /* generate random special values for 1/3 the needed number of characters */
    generatePasswordValues(3,specialArr,charLength);
  } else if (lowerCaseFlag === "N" && upperCaseFlag === "N" && numericFlag === "Y" && specialCharFlag === "Y") {
    /* generate random numeric values for 1/2 the needed number of characters */
    generatePasswordValues(2,numericArr,charLength);
    /* generate random special values for 1/2 the needed number of characters */
    generatePasswordValues(2,specialArr,charLength);
  } else if (lowerCaseFlag === "N" && upperCaseFlag === "N" && numericFlag === "N" && specialCharFlag === "Y") {
    /* generate random special values for the needed number of characters */
    generatePasswordValues(1,specialArr,charLength);
  } else if (lowerCaseFlag === "Y" && upperCaseFlag === "N" && numericFlag === "N" && specialCharFlag === "N") {
    /* generate random lowercase values for the needed number of characters */
    generatePasswordValues(1,lowerArr,charLength);
  } else if (lowerCaseFlag === "N" && upperCaseFlag === "Y" && numericFlag === "N" && specialCharFlag === "N") {
    /* generate random uppercase values for the needed number of characters */
    generatePasswordValues(1,upperArr,charLength);
  } else if (lowerCaseFlag === "N" && upperCaseFlag === "N" && numericFlag === "Y" && specialCharFlag === "N") {
    /* generate random numeric values for the needed number of characters */
    generatePasswordValues(1,numericArr,charLength);
  } 

  /* shuffle array and return string to @writePassword function */
  var password = shuffle(generatedArr);
  return password.join("");
}

/* 
 * @writePassword
 * generate password then 
 * write password to the 
 * #password input; enable 
 * copy to clipboard button 
 * and empty password array
 */
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  copyBtn.disabled = false;
  generatedArr = [];
}
