// Shortcut for console.log and assert.
let {log} = console;
let {assert} = console;

// Instantiate boxInput 
var boxInput = document.querySelector('#input-box');

var userInput = "";
var result = "";
var finalOutPut = "";

let arrayParentheses = [];

/**
 * Replace characters and compute string input.
 * @param inputs: string with digit or character
 * like 'x' for multiple and '÷' for divide.
 * @returns String of digit or digits calculated.
 */
compute = function(inputs){
  // Replace 'x', '%', '÷' to different signs.
  let textInput = inputs.replaceAll('x', '*').replaceAll('÷', '/').replaceAll('%', '/100');

  return new String(eval(textInput)).valueOf().toUpperCase();
}

/**
 * Assertion test compute function.
 */
assert(compute('4x3') === '12');
assert(compute('12÷2') === '6');
assert(compute('6÷2÷3') === '1')
assert(compute('2%') === '0.02');
assert(compute('4%-6') === '-5.96');


/**
 * Adds parentheses to the inputs.
 * @param inputs
 */
function parenthesesHandler(userInput){
  
  let re = new RegExp(/\(*\d+/g);
  let secondMatch = new RegExp(/[x+÷-]$/g);
  let digit_prevent = new RegExp(/\d+$|\)/g);
  let endsWithDigit = new RegExp(/\d$/g);
  
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
      log(userInput);
      //boxInput.valu
    }
    else {
      arrayParentheses.push("(");
      newInput = arrayParentheses[0];
      //boxInput.value = userInput;
    }
  }
  else if (secondMatch.test(userInput)) {
    arrayParentheses.push('(');
    newInput = arrayParentheses[0];
    //boxInput.value = userInput;
  }
  
  
  
  /*else if (digit_prevert.test(userInput)){
    userInput += '(';
    boxInput.value = userInput;
  }*/
  
  else {
    newInput = ')';
    //boxInput.value = userInput;
    arrayParentheses.pop();
  }
  
  return newInput;
}


document.addEventListener('DOMContentLoaded',
() => {
  var buttons = document.querySelectorAll('input[type=button');
  
  //boxInput.autofocus = 'true';
  
  // for each button
  buttons.forEach(btn => {
    btn.onclick = function(){
      if (!isNaN(this.dataset.num)){
        // Check if the button has a number as dataset.
        if (finalOutPut){
          finalOutPut += this.dataset.num;
          
          if (finalOutPut.match(/(\d+%\d+)/g)){
            finalOutPut = finalOutPut.replaceAll('%', '%x').replaceAll('xx', 'x');
          }
          
          boxInput.value = finalOutPut;
        }
        
        else{
          
          userInput += this.dataset.num;
          
          if (userInput.match(/(\d+%\d+)/g)){
            userInput = userInput.replaceAll('%', '%x').replaceAll('xx', 'x');
          }
          
          boxInput.focus();
          boxInput.value = userInput
        }
        
      }
      
      if (btn.value === "C"){
        // Clear out the results in the box input.
        userInput = "";
        finalOutPut = "";
        arrayParentheses.length = 0;
        document.querySelector('.result').innerHTML = "";
        boxInput.value = userInput;
        boxInput.focus();
      }
      
      if (btn.value === "( )"){
        if (finalOutPut){
          finalOutPut += parenthesesHandler(finalOutPut);
          boxInput.value = finalOutPut;
        }
        else{
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
        if (btn.value == sign){
          if (finalOutPut){
            if (!finalOutPut.endsWith(sign)){
              finalOutPut = finalOutPut + sign;
              boxInput.value = finalOutPut;
              boxInput.focus();
            }
            else{
              boxInput.focus();
            }
          }
          else{
            if (!userInput.endsWith(sign)){
              userInput = userInput + sign;
              boxInput.value = userInput;
              boxInput.focus();
            }
            else{
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
      
      if (btn.value == "="){
        
        if (finalOutPut){
          //finalOutPut = finalOutPut.replace("÷", "/").replace("x", '*').replace("%", "/100");
          
          finalOutPut = compute(finalOutPut);
          
          userInput = finalOutPut;
          boxInput.value = finalOutPut;
          finalOutPut = "";
          document.querySelector('.result').innerHTML = "";
          arrayParentheses.length = 0;
        }
        else{
          // save the final output
          finalOutPut = compute(userInput)
          
          // put the final output to the input box
          userInput = compute(userInput)
          
          boxInput.value = userInput;
          document.querySelector('.result').innerHTML = "";
          userInput = "";
          arrayParentheses.length = 0;
        }
        
        
      }
      
    // Display the replace.
    
    if (userInput.match(/(\d+[x+÷-]\d+)|(\d+%)/g)){
      /*if digits times or plus etc digits or 
        digits endswith % in userInput
        display the result
      */
      document.querySelector('.result').innerHTML = compute(userInput);
    }
    
    if (finalOutPut.match(/(\d+[x+÷-]\d+)|(\d+%)/g)){
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
