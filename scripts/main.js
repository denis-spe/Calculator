// Shortcut for console.log and assert.
let { log } = console;
let { assert } = console;

// Instantiate boxInput 
var boxInput = document.querySelector('#input-box');

var userInput = "";
var result = "";
var finalOutPut = "";

let arrayParentheses = [];

/*
 * It handle the execution of code without a closing
 * parentheses
 * @param inputs: Inputs to pass in eval function.
 * @return new inputs: A new string inputs.
 */
let parenthesesRemover = function(output) {
  if (arrayParentheses.length > 0) {
    return output.replaceAll("(", "");
  }
  return output;
}

/**
 * Replace characters and compute string input.
 * @param inputs: string with digit or character
 * like 'x' for multiple and '÷' for divide.
 * @returns String of digit or digits calculated.
 */
let compute = function(inputs) {
  // Replace 'x', '%', '÷' to different signs.
  let textInput = inputs.replaceAll('x', '*').replaceAll('÷', '/').replaceAll('%', '/100');

  /* Before computing check if there is 
   enough closing parentheses else remove
   open parentheses.
  */
  textInput = parenthesesRemover(textInput)

  // Number execution.
  var exec = eval(textInput);

  /*if ((exec + "".split('. > 10){
    exec = exec.toFixed(10);
  }*/


  // Change the executed output to string.
  var output = new String(exec).valueOf().toUpperCase();

  if (output.includes('.')) {
    if (output.split('.')[1].length > 10) {
      // Reduce the amount of digit precision.
      output = new String(eval(textInput).toFixed(10)).valueOf().toUpperCase();
    }
  }

  return output;
}

/**
 * Assertion test compute function.
 */
assert(compute('5÷3') === '1.6666666667');
assert(compute('4x3') === '12');
assert(compute('12÷2') === '6');
assert(compute('6÷2÷3') === '1')
assert(compute('2%') === '0.02');
assert(compute('4%-6') === '-5.96');


/**
 * Adds parentheses to the inputs.
 * @param inputs
 */
function parenthesesHandler(userInput) {

  let re = new RegExp(/\(*\d+/g);
  let secondMatch = new RegExp(/[x+÷-]$/g);
  let digit_prevent = new RegExp(/\d+$|\)/g);
  let endsWithDigit = new RegExp(/\d$/g);
  let endswithParanetheses = new RegExp(/\)$/g);
  let startWithParenthesesNegative = new RegExp(/\(\-\d*/g);

  /*
  Prevent closing parentheses if no 
  content in opening parentheses
  */
  let checkOpenPaenthesesRegex = new RegExp(/\(.*/g);

  /*if (!re.test(userInput)){
    arrayParentheses.push("(");
    userInput += arrayParentheses[0];
    boxInput.value = userInput;
  }*/

  let newInput;

  if (arrayParentheses.length == 0) {

    if (endsWithDigit.test(userInput)) {
      arrayParentheses.push('(');
      newInput = 'x' + arrayParentheses[0];
    }
    else if (endswithParanetheses.test(userInput)) {
      arrayParentheses.push('(');
      newInput = 'x' + arrayParentheses[0];
    }

    else {
      arrayParentheses.push("(");
      newInput = arrayParentheses[0];
      //boxInput.value = userInput;
      boxInput.focus()
    }
  }
  else if (secondMatch.test(userInput)) {
    arrayParentheses.push('(');
    newInput = arrayParentheses[0];
    //boxInput.value = userInput;
  }

  else if (endsWithDigit.test(userInput) && arrayParentheses.length > 0) {
    newInput = ")";
    arrayParentheses.pop()
    console.log(arrayParentheses);
  }

  else {
    newInput = ")"
    arrayParentheses.length = 0;
    console.log(arrayParentheses);
  }

  return newInput;
}


let negativeCallable = function(userInput) {
  let endsWithDigit = new RegExp(/\d*$/g);
  let endsWithParentheses = new RegExp(/\d*\)$/g);
  let hasAsignInMiddle = new RegExp(/[x+÷-]\d*$/g);

  // Extract x4 from (-(-2x4
  let extracted = hasAsignInMiddle.exec(userInput);

  if (extracted !== null) {
    let num = extracted[0].substring(1);
    let sign = extracted[0][0];
    let onclick = userInput.replace(extracted, "") + sign + "(-" + num;
    arrayParentheses.push('(');
    return onclick;


  }

  else if (userInput.endsWith(")")) {
    let onclick = userInput + 'x(-';
    arrayParentheses.push("(")
    return onclick;
  }

  else if (endsWithDigit.test(userInput)) {
    let onclick = '(-' + userInput;
    arrayParentheses.push("(")
    return onclick;
  }

  let onclick = userInput + "(-";
  arrayParentheses.push("(")
  return onclick;
}


document.addEventListener('DOMContentLoaded',
  () => {
    var buttons = document.querySelectorAll('input[type=button');

    // for each button
    buttons.forEach(btn => {
      btn.onclick = function() {
        if (!isNaN(this.dataset.num)) {
          // Check if the button has a number as dataset.
          if (finalOutPut) {
            finalOutPut += this.dataset.num;

            if (finalOutPut.match(/(\d+%\d+)/g)) {
              finalOutPut = finalOutPut.replaceAll('%', '%x').replaceAll('xx', 'x');
            }

            boxInput.value = finalOutPut;
          }

          else {

            userInput += this.dataset.num;

            if (userInput.match(/(\d+%\d+)/g)) {
              userInput = userInput.replaceAll('%', '%x').replaceAll('xx', 'x');
            }

            boxInput.focus();
            boxInput.value = userInput
          }

        }

        if (btn.value === "C") {
          // Clear out the results in the box input.
          userInput = "";
          finalOutPut = "";
          arrayParentheses.length = 0;
          document.querySelector('.result').innerHTML = "";
          boxInput.value = userInput;
          boxInput.focus();
        }

        if (this.dataset.sign === "+/-") {
          userInput = negativeCallable(userInput);
          boxInput.value = userInput;
          boxInput.focus();
        }

        if (this.dataset.sign === ".") {
          if (finalOutPut) {
            // Add a dot to the final output
            finalOutPut += this.dataset.sign;
            // Put back the modified final output.
            boxInput.value
            boxInput.value = finalOutPut;
            // Focus on dot click
            boxInput.focus();
          }
          else {
            // Add a dot to the user input.
            userInput += this.dataset.sign;
            // Put back the modified userInput
            boxInput.value = userInput;
            // Focus on dot click
            boxInput.focus();
          }
        }

        if (btn.value === "( )") {
          if (finalOutPut) {
            finalOutPut += parenthesesHandler(finalOutPut);
            boxInput.value = finalOutPut;
          }
          else {
            userInput += parenthesesHandler(userInput);
            boxInput.value = userInput;
          }
          /**let re = new RegExp(/\(*\d+/g);
          let secondMatch = new RegExp(/[x+÷-]$/g);
          let digit_prevent = new RegExp(/\d+$|\)/g);
          let endsWithDigit = new RegExp(/\d$/g);
          
          //if (!re.test(userInput)){
            arrayParentheses.push("(");
            userInput += arrayParentheses[0];
            boxInput.value = userInput;
          }
          if (arrayParentheses.length == 0){
            if (endsWithDigit.test(userInput)){
              arrayParentheses.push('(');
              userInput = userInput + 'x' + arrayParentheses[0];
              log(userInput);
              boxInput.value = userInput;
            }
            else{
              arrayParentheses.push("(");
              userInput += arrayParentheses[0];
              boxInput.value = userInput;
            }
          }
          else if (secondMatch.test(userInput)){
            arrayParentheses.push('(');
            userInput += arrayParentheses[0];
            boxInput.value = userInput;
          }
          
          
          
          //else if (digit_prevert.test(userInput)){
            userInput += '(';
            boxInput.value = userInput;
          }
          
          else{
            userInput += ')';
            boxInput.value = userInput;
            arrayParentheses.pop();
          }*/

        }


        signCallback = (sign) => {
          if (btn.value == sign) {
            if (finalOutPut) {
              if (!finalOutPut.endsWith(sign)) {
                finalOutPut = finalOutPut + sign;
                boxInput.value = finalOutPut;
                boxInput.focus();
              }
              else {
                boxInput.focus();
              }
            }
            else {
              if (!userInput.endsWith(sign)) {
                
                if (userInput !== "" && userInput.match(/(\d+$)|(\.*\)$)/g)){
                  userInput = userInput + sign;
          
                  boxInput.value = userInput;
                }
                boxInput.focus();
              }
            }
          }
        }

        // Call the sign callback
        signCallback("+");
        signCallback("-");
        signCallback("÷");
        signCallback("x");
        signCallback("%");

        if (btn.value == "=") {
          /* Before computing check if there is 
            enough closing parentheses else remove
            open parentheses.
          */
          userInput = parenthesesRemover(userInput)

          if (finalOutPut) {
            //finalOutPut = finalOutPut.replace("÷", "/").replace("x", '*').replace("%", "/100");
            finalOutPut = compute(finalOutPut);

            userInput = finalOutPut;
            boxInput.value = finalOutPut;
            finalOutPut = "";
            document.querySelector('.result').innerHTML = "";
            arrayParentheses.length = 0;

            // Alway focus
            boxInput.focus();
          }
          else {
            // save the final output
            finalOutPut = compute(userInput)



            // put the final output to the input box
            userInput = compute(userInput)

            boxInput.value = userInput;
            document.querySelector('.result').innerHTML = "";
            userInput = "";
            arrayParentheses.length = 0;

            // Alway focus
            boxInput.focus();
          }


        }

        // Display the replace.

        if (userInput.match(/(\d+[x+÷-]\d+)|([-+X÷]\d+$)|([-+X÷]\(\d+)/g)) {

          /*if digits times or plus etc digits or 
            digits endswith % in userInput
            display the result
          */
          document.querySelector('.result').innerHTML = compute(userInput);
        }

        if (finalOutPut.match(/(\d+[x+÷-]\d+)|([-+X÷]\d+$)/g)) {

          /*if digits times or plus etc digits or 
        digits endswith % in finalOutPut
        display the result
      */
          document.querySelector('.result').innerHTML = compute(finalOutPut);
        }

      }
    })
  })









/*********** Glory Be To God ******/