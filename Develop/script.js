//GIVEN I need a new, secure password
//WHEN I click the button to generate a password
//THEN I am presented with a series of prompts for password criteria
//WHEN prompted for password criteria
//THEN I select which criteria to include in the password
//WHEN prompted for the length of the password
//THEN I choose a length of at least 8 characters and no more than 128 characters
//WHEN asked for character types to include in the password
//THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
//WHEN I answer each prompt
//THEN my input should be validated and at least one character type should be selected
//WHEN all prompts are answered
//THEN a password is generated that matches the selected criteria
//WHEN the password is generated
//THEN the password is either displayed in an alert or written to the page



/* Get references to the #generate element */
var generateBtn = document.querySelector("#generate");

/* get character length */
function getCharLength() {

  /* initialize prompt */
  let charLength = parseInt(prompt('Enter the number of characters you would like for your password. (Minimum 8 - Maximum 128)'))
  
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
  let charFlag = false;
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
  let charArr = [
    {
      name: "lowerCase",
      value: lowerChar
    },
    {
      name: "upperCase",
      value: upperChar
    },
    {
      name: "numeric",
      value: numericChar
    },
    {
      name: "special",
      value: specialChar
    }
  ];
  return charArr;
}

/* generate the password based on user input: character length, lower/upper/numeric/special */
function generatePassword() {

  let charLength = getCharLength();
  let charType = getCharType();
  let lowerCaseFlag = charType[0].value;
  let upperCaseFlag = charType[1].value;
  let numericFlag = charType[2].value;
  let specialCharFlag = charType[3].value;


}

/* Write password to the #password input */
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

/* Add event listener to generate button */
generateBtn.addEventListener("click", writePassword);
